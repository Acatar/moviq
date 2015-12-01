/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'jqButtons',
    dependencies: ['locale', 'constants', 'jqQuerySelectors', 'IButtons', 'snapshot', 'jQuery'],
    factory: function (locale, constants, querySelectorsCtor, IButtons, snapshot, $) {
        "use strict";

        var init,
            bindButtonEvents,
            handlers,
            cursorManager;

        cursorManager = function () {
            var throttle = false,
                timeout,
                bind,
                hide;

            bind = function () {
                $(document).mousemove(function (event) {
                    if (!throttle) {
                        throttle = false;
                        clearTimeout(timeout);
                        $('html').css({cursor: 'default'});
                        timeout = setTimeout(hide, 1000);
                    }
                });
            };

            hide = function () {
                $('html').css({cursor: 'none'});
                throttle = true;
                setTimeout(function () {
                    throttle = false;
                }, 500);
            };

            return {
                bind: bind
            };
        };

        bindButtonEvents = function (movi, btns, querySelectors) {
            var playBtn = querySelectors.controls.getHandle(querySelectors.controls.play),
                ccButton = querySelectors.controls.getHandle(querySelectors.controls.cc),
                ccChoice = querySelectors.controls.getHandle(querySelectors.controls.cc_choice),
                speedBtn = querySelectors.controls.getHandle(querySelectors.controls.speed),
                qualityBtn = querySelectors.controls.getHandle(querySelectors.controls.quality),
                qualityChoice = querySelectors.controls.getHandle(querySelectors.controls.quality_choice),
                muteBtn = querySelectors.controls.getHandle(querySelectors.controls.mute),
                fullscreenBtn = querySelectors.controls.getHandle(querySelectors.controls.fullscreen),
                speedChooser = querySelectors.controls.getHandle(querySelectors.controls.speed_chooser),
                speedCurrent = querySelectors.controls.getHandle(querySelectors.controls.speed_current);

            movi.$dom.$handle
                .on('mouseenter', function (event) {
                    movi.$dom.$controls.stop().fadeTo(500, 0.9);
                    movi.$dom.$header.stop().fadeTo(500, 0.9);

                    if ($(event.target).parent().hasClass('fullscreen')) {
                        $('html').css({cursor: 'default'});
                    }
                })
                .on('mouseleave', function (event) {
                    movi.$dom.$controls.stop().fadeOut();
                    movi.$dom.$header.stop().fadeOut();

                    if ($(event.target).parent().hasClass('fullscreen')) {
                        $('html').css({cursor: 'none'});
                    }
                });

            playBtn.on('click', function (event) {
                var state = btns.togglePlay();

                if (state === 1) {
                    movi.events.onPlay(event);
                } else if (state === 0) {
                    movi.events.onPause(event);
                }
            });

            ccButton.on('click', function (event) {
                var state = btns.toggleCaptions();

                if (state === 1) {
                    movi.events.onShowCaptions(event);
                } else if (state === 0) {
                    movi.events.onHideCaptions(event);
                }
            });

            ccChoice.on('click', function (event) {
                var self = $(event.currentTarget),
                    state = btns.changeCaption(self);

                if (state.toggle === 1) {
                    movi.events.onShowCaptions(state.lang, event);
                } else if (state.toggle === 0) {
                    movi.events.onHideCaptions(state.lang, event);
                }
            });

            speedBtn.on('click', function (event) {
                var speed = btns.toggleSpeed();

                movi.events.onToggleSpeed(event);
            });

            speedChooser.on('change mousemove', function (event) {
                var speed = btns.changeSpeed(speedChooser.val());
                speedCurrent.text(speedChooser.val() + 'x');

                if (speed.changed) {
                    movi.events.onChangeSpeed(event, speed.newSpeed);
                }
            });

            qualityBtn.on('click', function (event) {
                var quality = btns.toggleQuality();

                movi.events.onToggleQuality(event);
            });

            qualityChoice.on('click', function (event) {
                var self = $(event.currentTarget),
                    label = self.attr('data-quality'),
                    quality = btns.changeQuality(label);

                movi.events.onChangeQuality(quality);
            });

            muteBtn.on('click', function (event) {
                var state = btns.toggleMute();

                if (state === 1) {
                    movi.events.onSoundOn(event);
                } else if (state === 0) {
                    movi.events.onSoundOff(event);
                }
            });

            fullscreenBtn.on('click', function (event) {
                var state = btns.toggleFullscreen();

                if (state === 1) {
                    movi.events.onFullscreenOn(event);
                } else if (state === 0) {
                    movi.events.onFullscreenOff(event);
                }
            });
        };

        handlers = function (movi, querySelectors) {
            var $video = movi.$dom.$video,
                video = movi.dom.video,
                togglePlay,
                toggleCaptions,
                toggleTextTrack,
                changeCaption,
                buttonsToShow,
                toggleFullscreen,
                fullscreenIn,
                fullscreenOut,
                toggleMute,
                toggleSpeed,
                changeSpeed,
                toggleSubmenu,
                toggleQuality,
                changeQuality;

            togglePlay = function () {
                var playIcon = querySelectors.controls.getIconHandle(querySelectors.controls.play);

                if (video.paused || video.ended) {
                    playIcon.removeClass(constants.iconClasses.play).addClass(constants.iconClasses.pause);
                    video.play();
                    return 1;
                } else {
                    playIcon.removeClass(constants.iconClasses.pause).addClass(constants.iconClasses.play);
                    video.pause();
                    return 0;
                }
            };

            toggleFullscreen = function () {
                var container = movi.$dom.$handle;

                if (container.hasClass('fullscreen')) {
                    fullscreenOut(movi);
                    return 0;
                } else {
                    fullscreenIn(movi);
                    return 1;
                }
            };

            fullscreenIn = function () {
                var container = movi.dom.handle,
                    $container = movi.$dom.$handle,
                    $icon = querySelectors.controls.getIconHandle(querySelectors.controls.fullscreen);

                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                } else if (container.mozRequestFullScreen) {
                    container.mozRequestFullScreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else {
                    movi.events.onError(locale.errors.jqButtons.fullscreenNotSupported);
                }

                $container.addClass('fullscreen');
                $icon.removeClass(constants.iconClasses.expand).addClass(constants.iconClasses.compress); // fa-expand

                $(document)
                    .off('keyup.moviq-fs')
                    .on('keyup.moviq-fs',function(evt) {
                        if (evt.keyCode == 27) {
                            // The user pressed escape.
                            // We need to manipulate the DOM if they
                            // were in fullscreen
                            btns.fullscreenOut();
                        }
                    });
            };

            fullscreenOut = function () {
                var container = movi.dom.handle,
                    $container = movi.$dom.$handle,
                    $icon;

                if (!$container.hasClass('fullscreen')) {
                    return;
                }

                $icon = querySelectors.controls.getIconHandle(querySelectors.controls.fullscreen);

                $container.removeClass('fullscreen');
                $icon.removeClass(constants.iconClasses.compress).addClass(constants.iconClasses.expand); // fa-expand

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            };

            toggleCaptions = function () {
                var ccButton = querySelectors.controls.getHandle(querySelectors.controls.cc),
                    track = video.textTracks[0],
                    none = video.textTracks.length < 1,
                    moreThanOne = video.textTracks.length > 1;

                if (none) {
                    return;
                } else if (moreThanOne) {
                    return toggleSubmenu(ccButton, 'with-cc');
                } else {
                    return toggleTextTrack(ccButton, movi.captions[0].srclang, track);
                }
            };

            toggleTextTrack = function (ccButton, lang, track) {
                if (ccButton.hasClass('selected')) {
                    ccButton.removeClass('selected');
                    if (track) {
                        track.mode = 'hidden';
                        return {
                            state: 0,
                            lang: lang
                        };
                    }
                } else {
                    ccButton.addClass('selected');
                    if (track) {
                        track.mode = 'showing';
                        return {
                            state: 1,
                            lang: lang
                        };
                    }
                }
            };

            changeCaption = function (choiceButton) {
                var lang = choiceButton.attr('data-lang'),
                    i = parseInt(choiceButton.attr('data-id'), 10),
                    track = video.textTracks[i];

                return toggleTextTrack(choiceButton, lang, track);
            };

            toggleMute = function () {
                var $icon = querySelectors.controls.getIconHandle(querySelectors.controls.mute);

                video.muted = !video.muted;

                if ($icon.hasClass(constants.iconClasses.volumeOff)) {
                    $icon.removeClass(constants.iconClasses.volumeOff).addClass(constants.iconClasses.volumeOn);
                    return 0;
                } else {
                    $icon.removeClass(constants.iconClasses.volumeOn).addClass(constants.iconClasses.volumeOff);
                    return 1;
                }
            };

            toggleSpeed = function () {
                var spdClass = 'with-speed',
                    speedButton = querySelectors.controls.getHandle(querySelectors.controls.speed);

                toggleSubmenu(speedButton, 'with-speed');
            };

            changeSpeed = function (speed) {
                if (typeof speed === 'number') {
                    var newSpeed = speed.toFixed(2),
                        oldSpeed = video.playbackRate.toFixed(2);

                    if (newSpeed !== oldSpeed) {
                        video.playbackRate = speed;
                        return {
                            newSpeed: newSpeed,
                            changed: true
                        };
                    } else {
                        return {
                            newSpeed: newSpeed,
                            changed: false
                        };
                    }
                } else if (typeof speed === 'string') {
                    try {
                        return changeSpeed(parseFloat(speed));
                    } catch (e) {
                        return video.playbackRate;
                    }
                } else {
                    return {
                        newSpeed: video.playbackRate.toFixed(2),
                        changed: false
                    };
                }
            };

            toggleQuality = function () {
                var spdClass = 'with-quality',
                    qualityButton = querySelectors.controls.getHandle(querySelectors.controls.quality),
                    none = movi.sources.length < 2;

                if (none) {
                    return;
                } else {
                    toggleSubmenu(qualityButton, 'with-quality');
                }
            };

            changeQuality = function (label) {
                var source, position, i, hidden = 'moviq-hidden', shortLabel;

                // take a snapshot and place it over the video
                snapshot.grab(movi);
                movi.$dom.$handle.children(querySelectors.canvas).removeClass(hidden);

                // find the chosen source
                for (i = 0; i < movi.sources.length; i += 1) {
                    if (movi.sources[i].label === label) {
                        source = movi.sources[i];
                        break;
                    }
                }

                // update the source label
                shortLabel = source.label.length > 2 ? source.label.substr(0, 2) : source.label;
                querySelectors.controls.getHandle(querySelectors.controls.quality + ' em').text(shortLabel);

                // remember the current position of the video
                position = video.currentTime;

                // if the video is playing
                if (!video.paused) {
                    // pause the video
                    togglePlay();
                }

                // set the new source
                video.src = source.src;

                // start to load the video, so we get the metadata
                video.load();

                // the next time the loadedmetadata event fires
                $video.one('loadedmetadata', function (event) {

                    // set the position to point where the user switched the source
                    video.currentTime = position;

                    // and start playing the video, again
                    togglePlay();

                    // hide the snapshot after the video starts playing again
                    $video.one('playing', function (event) {
                        movi.$dom.$handle.children(querySelectors.canvas).addClass(hidden);
                    });
                });

                return source;
            };

            toggleSubmenu = function ($selection, containerClass) {
                if ($selection.hasClass('selected')) {
                    // the class being toggled was selected, de-select it
                    $selection.removeClass('selected');
                    movi.$dom.$controls.removeClass(containerClass);
                } else {
                    var i;

                    // clear any other selected menu buttons
                    querySelectors.controls.getHandle(querySelectors.controls.subMenuButton + '.selected').removeClass('selected');

                    // clear any open submenus (i.e. with-speed, with-quality, etc.)
                    for (i = 0; i < querySelectors.controls.subMenus.length; i += 1) {
                        movi.$dom.$controls.removeClass(querySelectors.controls.subMenus[i]);
                    }

                    // select the class being toggled
                    $selection.addClass('selected');
                    movi.$dom.$controls.addClass(containerClass);
                }
            };

            // INIT
            return new IButtons({
                togglePlay: togglePlay,
                toggleCaptions: toggleCaptions,
                changeCaption: changeCaption,
                toggleFullscreen: toggleFullscreen,
                fullscreenOut: fullscreenOut,
                toggleMute: toggleMute,
                toggleSpeed: toggleSpeed,
                changeSpeed: changeSpeed,
                toggleQuality: toggleQuality,
                changeQuality: changeQuality
            });
        };

        init = function (moviInstance) {
            var querySelectors = querySelectorsCtor(moviInstance),
                handls = handlers(moviInstance, querySelectors);

            bindButtonEvents(moviInstance, handls, querySelectors);

            if (moviInstance.captions.length > 1) {
                querySelectors.controls.getHandle(querySelectors.controls.cc).addClass(querySelectors.controls.subMenuButtonClassName);
            }

            return handls;
        };

        return {
            init: init
        };
    }
});
