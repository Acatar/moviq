/*global jQuery, console*/
(function (exports, $) {
    "use strict";
    
    var Video,
        VideoContainer,
        Buttons,
        buttons,
        progress,
        Events,
        events,
        EventEmitter,
        moviqEventEmitter,
        sources,
        bindVideos,
        bindEvents,
        defaultLocale,
        html,
        handles = {
            header: '.moviq-header',
            controls: {
                control_container: '.moviq-controls',
                play: '.moviq-btn-play',
                mute: '.moviq-btn-mute',
                fullscreen: '.moviq-btn-fullscreen',
                cc: '.moviq-btn-cc',
                speed: '.moviq-speed',
                quality: '.moviq-quality',
                progress: '.moviq-progress',
                progress_bar: '.moviq-progress-bar',
                progress_buffer: '.moviq-progress-buffer',
                progress_time: '.moviq-progress-time',
                progress_timeDisplay: '.moviq-progress-display',
                progress_timePicker: '.moviq-progress-picker',
                buttons_right: '.moviq-buttons-right',
                controls_left: '.moviq-controls-left',
                controls_right: '.moviq-controls-right',
                getHandle: function (movi, buttonHandle) {
                    return movi.container.$controls.find(buttonHandle);
                },
                getIconHandle: function (movi, buttonHandle) {
                    return movi.container.$controls.find(buttonHandle + ' span');
                }
            }
        };
    
    /*
    // The core moviq Video object - an entry point for the public API
    */
    Video = function ($videoContainer, eventEmitter, locale) {
        var self = this,
            cc;
        
        $videoContainer.append(html.controls);
        
        self.locale = locale || defaultLocale;
        self.events = new Events(eventEmitter || moviqEventEmitter);
        self.container = new VideoContainer($videoContainer);
        self.buttons = new Buttons(self);
        
        if (self.container.manifest) {
            self.container.sources = sources.getSourcesByManifest(self);
            
        } else {
            self.container.sources = sources.getSources(self);
        }
        
        cc = self.container.html5Video.textTracks[0];
        
        if (cc) {
            cc.mode = 'hidden';
        }
        
        $videoContainer.addClass('moviqified');
    };
    
    /*
    // The DOM representations of the video
    */
    VideoContainer = function ($videoContainer) {
        var self = this;
        
        self.$handle = $videoContainer;
        self.domHandle = self.$handle[0];
        self.$video = self.$handle.children('video').first();
        self.html5Video = self.$video[0];
        self.$controls = self.$handle.children(handles.controls.control_container).first();
        self.$header = self.$handle.children(handles.header).first();
        self.manifest = self.html5Video.dataset.manifest;
        self.sources = undefined;
    };
    
    /*
    // The button handlers for a given video
    */
    Buttons = function (movi) {
        var self = this,
            btns = buttons.init(movi, self),
            prog = progress.init(movi);
        
        self.togglePlay = function () { return btns.togglePlay(); };
        self.toggleFullscreen = function () { return btns.toggleFullscreen(); };
        self.toggleCaptions = function () { return btns.toggleCaptions(); };
        self.toggleMute = function () { return btns.toggleMute(); };
        self.toggleQuality = function () { return btns.toggleQuality(); };
        self.toggleSpeed = function () { return btns.toggleSpeed(); };
    };
    
    /*
    // The events for a given video
    */
    Events = function (eventEmitter) {
        var trigger;
        
        this.onLoadMetadata = function () {};
        this.onTimeUpdate = function () {};
        this.onCanPlay = function () {};
        this.onCanPlayThrough = function () {};
        this.onVideoEnded = function () {};
        this.onSeeking = function () {};
        this.onSeeked = function () {};
        this.onWaiting = function () {};

        this.onError = function (message) {
            trigger('moviq-error', { message: message });
            throw new Error(message);
        };
        
        this.onPlay = function (event) {
            trigger('moviq-play', { event: event });
        };
        
        this.onPause = function (event) {
            trigger('moviq-pause', { event: event });
        };
        
        this.onShowCaptions = function (event) {
            trigger('moviq-show-captions', { event: event });
        };
        
        this.onHideCaptions = function (event) {
            trigger('moviq-hide-captions', { event: event });
        };
        
        this.onToggleSpeed = function (speed, event) {
            trigger('moviq-toggle-speed', { speed: speed, event: event });
        };
        
        this.onToggleQuality = function (quality, event) {
            trigger('moviq-toggle-quality', { quality: quality, event: event });
        };
        
        this.onSoundOn = function (event) {
            trigger('moviq-sound-on', { event: event });
        };
        
        this.onSoundOff = function (event) {
            trigger('moviq-sound-off', { event: event });
        };
        
        this.onFullscreenOn = function (event) {
            trigger('moviq-fullscreen-on', { event: event });
        };
        
        
        this.onFullscreenOff = function (event) {
            trigger('moviq-fullscreen-off', { event: event });
        };
        
        trigger = function (type, data) {
            $(document)
                .trigger(type, [data])
                .trigger('moviq-event', [type, data]);
        };
        
    };
    
    /*
    // All text defaults to english
    */
    defaultLocale = (function () {
        return {
            errors: {
                buttons: {
                    fullscreenNotSupported: 'Sorry, we don\'t recognize your browser, so we can\'t toggle fullscreen mode.'
                },
                sources: {
                    invalidSource: 'The Source is invalid: both the src attribute and type must be set.'
                }
            }
        };
    }());
    
    html = (function () {
        var controls;
        
        controls =
              '<div class="moviq-controls">'
            + '<div class="moviq-controls-enclosure">'
            + '<div class="moviq-controls-left">'
            + '    <button class="moviq-btn moviq-btn-play" title="Play/Pause video">'
            + '        <span class="fa fa-play"></span>'
            + '    </button>'
            + '</div>'
            + '<div class="moviq-progress">'
            + '    <span class="moviq-progress-display"></span>'
            + '    <span class="moviq-progress-picker"></span>'
            + '    <div class="moviq-progress-bar">'
            + '        <span class="moviq-progress-buffer"></span>'
            + '        <span class="moviq-progress-time"></span>'
            + '    </div>'
            + '</div>'
            + '<div class="moviq-controls-right">'
            + '    <div class="moviq-dropdown">'
            + '        <button class="moviq-btn moviq-dropdown-toggle" type="button" data-toggle="dropdown" title="Moviq Menu">'
            + '            <span class="fa fa-cog"></span>'
            + '        </button>'
            + '        <ul class="moviq-dropdown-menu" role="menu">'
            + '            <li role="presentation">'
            + '                <button class="moviq-btn moviq-btn-cc" role="menuitem" tabindex="-1" title="Closed Captions">'
            + '                    <i class="fa fa-cc"></i>'
            + '                </button>'
            + '            </li>'
            + '            <li role="presentation">'
            + '                <button class="moviq-btn moviq-btn-speed" role="menuitem" tabindex="-1" title="Playback Speed">'
            + '                    <i class="fa fa-clock-o"></i>'
            + '                </button>'
            + '            </li>'
            + '            <li role="presentation">'
            + '                <button class="moviq-btn moviq-btn-quality" role="menuitem" tabindex="-1" title="Video Quality">'
            + '                    <em>HD</em>'
            + '                </button>'
            + '            </li>'
            + '        </ul>'
            + '    </div>'
            + '    <button class="moviq-btn moviq-btn-mute" title="Mute/Unmute sound">'
            + '        <span class="fa fa-volume-off"></span>'
            + '    </button>'
            + '    <button class="moviq-btn moviq-btn-fullscreen" title="Switch to full screen">'
            + '        <span class="fa fa-arrows-alt"></span>'
            + '    </button>'
            + '</div>'
            + '</div>'
            + '</div>';
        
        return {
            controls: controls
        };
    }());
    
    /*
    // Private button functionality
    */
    buttons = (function () {
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
            init,
            bindButtonEvents;
        
        togglePlay = function () {
            var playIcon = handles.controls.getIconHandle(movi, handles.controls.play);

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
            var container = movi.container.$handle;
            
            if (container.hasClass('fullscreen')) {
                fullscreenOut(movi);
                return 0;
            } else {
                fullscreenIn(movi);
                return 1;
            }
        };
        
        fullscreenIn = function () {
            var container = movi.container.domHandle,
                $container = movi.container.$handle,
                $icon = handles.controls.getIconHandle(movi, handles.controls.fullscreen),
                locale = movi.locale.errors.buttons;

            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else {
                movi.events.onError(locale.fullscreenNotSupported);
            }
            
            $container.addClass('fullscreen');
            $icon.removeClass('fa-arrows-alt').addClass('fa-compress'); // fa-expand
        };
        
        fullscreenOut = function () {
            var $container = movi.container.$handle,
                $icon = handles.controls.getIconHandle(movi, handles.controls.fullscreen);
            
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
            var ccButton = handles.controls.getHandle(movi, handles.controls.cc),
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
            var $icon = handles.controls.getIconHandle(movi, handles.controls.mute);

            video.muted = !video.muted;

            if ($icon.hasClass('fa-volume-off')) {
                $icon.removeClass('fa-volume-off').addClass('fa-volume-up');
                return 0;
            } else {
                $icon.removeClass('fa-volume-up').addClass('fa-volume-off');
                return 1;
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
            var playBtn = handles.controls.getHandle(movi, handles.controls.play),
                ccButton = handles.controls.getHandle(movi, handles.controls.cc),
                speedBtn = handles.controls.getHandle(movi, handles.controls.speed),
                qualityBtn = handles.controls.getHandle(movi, handles.controls.quality),
                muteBtn = handles.controls.getHandle(movi, handles.controls.mute),
                fullscreenBtn = handles.controls.getHandle(movi, handles.controls.fullscreen);
            
            movi.container.$handle
                .on('mouseenter', function (event) {
                    movi.container.$controls.stop().fadeTo(500, 0.9);
                    movi.container.$header.stop().fadeTo(500, 0.9);
                })
                .on('mouseleave', function (event) {
                    movi.container.$controls.stop().fadeOut();
                    movi.container.$header.stop().fadeOut();
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
                // TODO select speed
                var speed = btns.toggleSpeed();
                
                movi.events.onToggleSpeed(speed, event);
            });
            
            qualityBtn.on('click', function (event) {
                // TODO select quality
                var quality = btns.toggleQuality();
                
                movi.events.onToggleQaulity(quality, event);
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
        
        init = function (moviInstance, btns) {
            movi = moviInstance;
            $video = movi.container.$video;
            video = movi.container.html5Video;
            
            bindButtonEvents(btns);
            
            return {
                togglePlay: togglePlay,
                toggleCaptions: toggleCaptions,
                toggleFullscreen: toggleFullscreen,
                toggleMute: toggleMute,
                buttonsToShow: buttonsToShow
            };
        };
        
        return {
            init: init
        };
        
    }()); // /buttons
    
    progress = (function () {
        var movi,
            $video,
            video,
            $bar,
            $timeBar,
            $bufferBar,
            $timeDisplay,
            init,
            bindProgressEvents,
            formatTime,
            coverage,
            meters,
            timePickerActive = false;
        
        coverage = {
            getPositionPercent: function () {
                return (100 * (video.currentTime / video.duration));
            },
            getBufferedPercent: function () {
                if (video.buffered.length > 0) {
                    return (100 * (video.buffered.end(0) / video.duration));
                } else {
                    return 0;
                }
            },
            getAmountConsumed: function () {
                throw new Error('NOT IMPLEMENTED');
            }
        };
        
        meters = {
            setPosition: function (pageX) {
                var percent = meters.getCoordinates(pageX).percent;
                
                meters.updateDisplay(percent);
                video.currentTime = ((video.duration * percent) / 100);
            },
            getCoordinates: function (pageX) {
                var position = (pageX - $bar.offset().left),
                    percent = ((100 * position) / $bar.width());
                
                if (percent > 100) {
                    percent = 100;
                } else if (percent < 0) {
                    percent = 0;
                }
                
                return {
                    position: position,
                    percent: percent
                };
            },
            getPosition: function (mousePageX) {
                var coordinates = meters.getCoordinates(mousePageX),
                    time = (video.duration * (coordinates.percent / 100));
                
                return {
                    time: formatTime(time),
                    left: coordinates.position
                };
            },
            updateDisplay: function (positionPercent) {
                var newPositionPercent = positionPercent || coverage.getPositionPercent(),
                    bufferedPercent = coverage.getBufferedPercent(),
                    currentTime = formatTime(video.currentTime);
                
                if (video.duration > 0) {
                    currentTime += ' / ' + formatTime(video.duration);
                }
                    
                $timeBar.css('width', newPositionPercent + '%');
                $bufferBar.css('width', bufferedPercent + '%');
                
                if (!timePickerActive) {
                    $timeDisplay.text(currentTime);
                }
            }
        };
        
        formatTime = function (seconds) {
            var m, s;
            
            m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
            s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
            
            return m + ":" + s;
        };
        
        bindProgressEvents = function () {
            var $display = handles.controls.getHandle(movi, handles.controls.progress_timeDisplay),
                $picker = handles.controls.getHandle(movi, handles.controls.progress_timePicker);
            
            $video.on('timeupdate', function () {
                meters.updateDisplay();
            });
            
            $bar
                .on('mousedown', function (event) {
                    meters.setPosition(event.pageX);
                })
                .on('mouseleave', function (event) {
                    $picker.text('');
                    timePickerActive = false;
                })
                .on('mousemove', function (event) {
                    var position = meters.getPosition(event.pageX);
                    
                    timePickerActive = true;
                    $display.text('');
                    $picker.text(position.time);
                    $picker.css('left', position.left);
                });
        };
        
        init = function (moviInstance) {
            movi = moviInstance;
            $video = movi.container.$video;
            video = movi.container.html5Video;
            $bar = handles.controls.getHandle(movi, handles.controls.progress_bar);
            $timeBar = handles.controls.getHandle(movi, handles.controls.progress_time);
            $bufferBar = handles.controls.getHandle(movi, handles.controls.progress_buffer);
            $timeDisplay = handles.controls.getHandle(movi, handles.controls.progress_timeDisplay);
            
            bindProgressEvents();
            meters.updateDisplay();
        };
        
        return {
            init: init
        };
        
    }()); // /progress
    
    /*
    // Private source functionality
    */
    sources = (function () {
        
        var Source,
            getSource,
            getSources,
            getSourcesByManifest;
        
        Source = function (source, errorHandler, locale) {
            if (!source || !source.type || !source.src) {
                errorHandler.onError(locale.invalidSource);
            }

            this.src = source.src;
            this.type = source.type;
        };
        
        getSources = function (movi) {
            var sources = [],
                source = getSource(movi.container.$video, movi.events, movi.locale.errors.sources),
                childSources = movi.container.$video.children('source'),
                currentSource,
                i;

            if (source) {
                sources.push(source);
            }

            for (i = 0; i < childSources.length; i += 1) {
                currentSource = getSource($(childSources[i]), movi.events, movi.locale.errors.sources);

                if (currentSource) {
                    sources.push(currentSource);
                }
            }

            return sources;
        };

        getSource = function ($source, errorHandler, locale) {
            var src = $source.attr('src'),
                type = $source.attr('type');

            if (src && type) {
                return new Source({
                    src: src,
                    type: type
                }, errorHandler, locale);
            }

            return null;
        };
        
        return {
            Source: Source,
            getSources: getSources,
            getSourcesByManifest: getSourcesByManifest
        };
        
    }()); // /sources
    
    bindVideos = function (jqSelector, eventEmitter, locale) {
        var videos,
            result = [],
            video,
            i,
            moviqified = '.moviqified';
        
        if (!jqSelector) {
            videos = $('.moviq-video').not(moviqified);
        } else if (typeof jqSelector === 'string') {
            videos = $($(jqSelector).not(moviqified));
        } else if (jqSelector instanceof $) {
            videos = jqSelector.not(moviqified);
        }
        
        if (videos.length === 0) {
            console.log('moviq info', 'no videos were found to process');
        }
        
        for (i = 0; i < videos.length; i += 1) {
            result.push(new Video($(videos[i]), eventEmitter, locale));
        }
        
        return result;
    };
    
    exports.moviq = {
        bindTo: bindVideos,
        bindAll: bindVideos
    };
    
}(window, jQuery));
