/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqButtons',
    dependencies: ['locale', 'jqQuerySelectors'],
    factory: function (locale, querySelectors) {
        "use strict";
        
        var movi,
            $video,
            video,
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
            init,
            bindButtonEvents;
        
        togglePlay = function () {
            var playIcon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.play);

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
                $icon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.fullscreen);

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
                $icon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.fullscreen);
            
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
            var ccButton = querySelectors.controls.getHandle(movi, querySelectors.controls.cc),
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
            var $icon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.mute);

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
                speedButton = querySelectors.controls.getHandle(movi, querySelectors.controls.speed);

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
                qualityButton = querySelectors.controls.getHandle(movi, querySelectors.controls.quality);
            
            toggleSelected(qualityButton, 'with-quality');
        };
        
        toggleSelected = function ($selection, containerClass) {
            if ($selection.hasClass('selected')) {
                // the class being toggled was selected, de-select it
                $selection.removeClass('selected');
                movi.$dom.$controls.removeClass(containerClass);
            } else {
                var i;
                
                // clear any other selected menus
                querySelectors.controls.getHandle(movi, '.selected').removeClass('selected');
                
                for (i = 0; i < querySelectors.controls.subMenus.length; i += 1) {
                    movi.$dom.$controls.removeClass(querySelectors.controls.subMenus[i]);
                }
                
                // select the class being toggled
                $selection.addClass('selected');
                movi.$dom.$controls.addClass(containerClass);
            }
        };
        
        buttonsToShow = function () {
            return {
                play: true,
                volume: true,
                fullscreen: true,
                speed: true,
                cc: video.textTracks.length > 0,
                quality: video.moviq.sources.count > 1
            };
        };
        
        bindButtonEvents = function (btns) {
            var playBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.play),
                ccButton = querySelectors.controls.getHandle(movi, querySelectors.controls.cc),
                speedBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.speed),
                qualityBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.quality),
                muteBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.mute),
                fullscreenBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.fullscreen),
                speedChooser = querySelectors.controls.getHandle(movi, querySelectors.controls.speed_chooser),
                speedCurrent = querySelectors.controls.getHandle(movi, querySelectors.controls.speed_current);
            
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
        
        init = function (moviInstance) {
            var self;
            
            movi = moviInstance;
            $video = movi.$dom.$video;
            video = movi.dom.video;
            
            self = {
                togglePlay: togglePlay,
                toggleCaptions: toggleCaptions,
                toggleFullscreen: toggleFullscreen,
                toggleMute: toggleMute,
                toggleSpeed: toggleSpeed,
                changeSpeed: changeSpeed,
                toggleQuality: toggleQuality,
                buttonsToShow: buttonsToShow
            };
            
            bindButtonEvents(self);
            
            return self;
        };
        
        return {
            init: init
        };
    }
});
