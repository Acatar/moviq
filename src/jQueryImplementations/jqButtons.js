/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqButtons',
    dependencies: ['locale', 'jqQuerySelectors', 'IButtons', 'jQuery'],
    factory: function (locale, querySelectorsCtor, Buttons, $) {
        "use strict";
        
        var init,
            bindButtonEvents,
            handlers;
        
        bindButtonEvents = function (movi, btns, querySelectors) {
            var playBtn = querySelectors.controls.getHandle(querySelectors.controls.play),
                ccButton = querySelectors.controls.getHandle(querySelectors.controls.cc),
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
                })
                .on('mouseleave', function (event) {
                    movi.$dom.$controls.stop().fadeOut();
                    movi.$dom.$header.stop().fadeOut();
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
                // TODO select quality
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
                buttonsToShow,
                toggleFullscreen,
                fullscreenIn,
                fullscreenOut,
                toggleMute,
                toggleSpeed,
                changeSpeed,
                toggleSelected,
                toggleQuality,
                changeQuality;

            togglePlay = function () {
                var playIcon = querySelectors.controls.getIconHandle(querySelectors.controls.play);

                if (video.paused || video.ended) {
                    playIcon.removeClass('fa-play').addClass('fa-pause');
                    video.play();
                    return 1;
                } else {
                    playIcon.removeClass('fa-pause').addClass('fa-play');
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
                $icon.removeClass('fa-arrows-alt').addClass('fa-compress'); // fa-expand
            };

            fullscreenOut = function () {
                var $container = movi.$dom.$handle,
                    $icon = querySelectors.controls.getIconHandle(querySelectors.controls.fullscreen);

                $container.removeClass('fullscreen');
                $icon.removeClass('fa-compress').addClass('fa-arrows-alt'); // fa-expand


                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            };

            toggleCaptions = function () {
                var ccButton = querySelectors.controls.getHandle(querySelectors.controls.cc),
                    track = video.textTracks[0];

                if (ccButton.hasClass('selected')) {
                    ccButton.removeClass('selected');
                    if (track) {
                        track.mode = 'hidden';
                        return 0;
                    }
                } else {
                    ccButton.addClass('selected');
                    if (track) {
                        track.mode = 'showing';
                        return 1;
                    }
                }
            };

            toggleMute = function () {
                var $icon = querySelectors.controls.getIconHandle(querySelectors.controls.mute);

                video.muted = !video.muted;

                if ($icon.hasClass('fa-volume-off')) {
                    $icon.removeClass('fa-volume-off').addClass('fa-volume-up');
                    return 0;
                } else {
                    $icon.removeClass('fa-volume-up').addClass('fa-volume-off');
                    return 1;
                }
            };

            toggleSpeed = function () {
                var spdClass = 'with-speed',
                    speedButton = querySelectors.controls.getHandle(querySelectors.controls.speed);

                toggleSelected(speedButton, 'with-speed');
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
                    qualityButton = querySelectors.controls.getHandle(querySelectors.controls.quality);

                toggleSelected(qualityButton, 'with-quality');
            };

            changeQuality = function (label) {
                var source,
                    i,
                    position;

                for (i = 0; i < movi.sources.length; i += 1) {
                    if (movi.sources[i].label === label) {
                        source = movi.sources[i];
                        break;
                    }
                }

                querySelectors.controls.getHandle(querySelectors.controls.quality + ' em').text(source.label);
                position = video.currentTime;
                video.pause();
                $video.attr('src', source.src);
                video.currentTime = position;
                video.play();

                return source;
            };

            toggleSelected = function ($selection, containerClass) {
                if ($selection.hasClass('selected')) {
                    // the class being toggled was selected, de-select it
                    $selection.removeClass('selected');
                    movi.$dom.$controls.removeClass(containerClass);
                } else {
                    var i;

                    // clear any other selected menus
                    querySelectors.controls.getHandle('.selected').removeClass('selected');

                    for (i = 0; i < querySelectors.controls.subMenus.length; i += 1) {
                        movi.$dom.$controls.removeClass(querySelectors.controls.subMenus[i]);
                    }

                    // select the class being toggled
                    $selection.addClass('selected');
                    movi.$dom.$controls.addClass(containerClass);
                }
            };
            
            // INIT
            return new Buttons({
                togglePlay: togglePlay,
                toggleCaptions: toggleCaptions,
                toggleFullscreen: toggleFullscreen,
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
            
            return handls;
        };
        
        return {
            init: init
        };
    }
});
