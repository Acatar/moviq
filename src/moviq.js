/*global jQuery, console*/
(function (exports, $) {
    "use strict";
    
    var Video,
        VideoContainer,
        Buttons,
        buttons,
        Events,
        events,
        EventEmitter,
        moviqEventEmitter,
        sources,
        bindVideos,
        bindEvents,
        defaultLocale;
    
    /*
    // The core moviq Video object - an entry point for the public API
    */
    Video = function ($videoContainer, eventEmitter, locale) {
        var container = new VideoContainer($videoContainer),
            cc;
        
        this.locale = locale || defaultLocale;
        this.events = new Events(eventEmitter || moviqEventEmitter);
        this.container = container;
        this.buttons = new Buttons(this);
        
        if (container.manifest) {
            this.container.sources = sources.getSourcesByManifest(this);
            
        } else {
            this.container.sources = sources.getSources(this);
        }
        
        cc = this.container.html5Video.textTracks[0];
        
        if (cc) {
            cc.mode = 'hidden';
        }
        
        $videoContainer.addClass('moviqified');
    };
    
    /*
    // The DOM representations of the video
    */
    VideoContainer = function ($videoContainer) {
        this.jqHandle = $videoContainer;
        this.domHandle = this.jqHandle[0];
        this.$video = this.jqHandle.children('video').first();
        this.html5Video = this.$video[0];
        this.controls = this.jqHandle.children('.moviq-controls').first();
        this.manifest = this.html5Video.dataset.manifest;
        this.sources = undefined;
    };
    
    /*
    // The button handlers for a given video
    */
    Buttons = function (movi) {
        this.togglePlay = function () { return buttons.togglePlay(movi); };
        this.toggleFullscreen = function () { return buttons.toggleFullscreen(movi); };
        this.toggleCaptions = function () { return buttons.toggleCaptions(movi); };
        this.toggleMute = function () { return buttons.toggleMute(movi); };
        this.toggleQuality = function () { return buttons.toggleQuality(movi); };
        this.toggleSpeed = function () { return buttons.toggleSpeed(movi); };
        
        buttons.bindEvents(movi, this);
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
    
    /*
    // Private button functionality
    */
    buttons = (function () {
        var buttonHandles,
            togglePlay,
            toggleCaptions,
            buttonsToShow,
            toggleFullscreen,
            fullscreenIn,
            fullscreenOut,
            toggleMute,
            bindEvents,
            getButtonHandle,
            getIconHandle;
        
        buttonHandles = {
            controls: '.moviq-controls',
            play: '.moviq-btn-play',
            mute: '.moviq-btn-mute',
            fullscreen: '.moviq-btn-fullscreen',
            cc: '.moviq-btn-cc',
            speed: '.moviq-speed',
            quality: '.moviq-quality'
        };
        
        getButtonHandle = function (movi, buttonHandle) {
            return movi.container.controls.find(buttonHandle);
        };
        
        getIconHandle = function (movi, buttonHandle) {
            return movi.container.controls.find(buttonHandle + ' i');
        };
        
        togglePlay = function (movi) {
            var video = movi.container.html5Video,
                playIcon = getIconHandle(movi, buttonHandles.play);

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
        
        toggleFullscreen = function (movi) {
            var container = movi.container.jqHandle;
            
            if (container.hasClass('fullscreen')) {
                fullscreenOut(movi);
                return 0;
            } else {
                fullscreenIn(movi);
                return 1;
            }
        };
        
        fullscreenIn = function (movi) {
            var container = movi.container.domHandle,
                $container = movi.container.jqHandle,
                $icon = getIconHandle(movi, buttonHandles.fullscreen),
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
        
        fullscreenOut = function (movi) {
            var $container = movi.container.jqHandle,
                $icon = getIconHandle(movi, buttonHandles.fullscreen);
            
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
        
        toggleCaptions = function (movi) {
            var ccButton = getButtonHandle(movi, buttonHandles.cc),
                video = movi.container.html5Video,
                track = movi.container.html5Video.textTracks[0];

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
        
        toggleMute = function (movi) {
            var $icon = getIconHandle(movi, buttonHandles.mute),
                video = movi.container.html5Video;

            video.muted = !video.muted;

            if ($icon.hasClass('fa-volume-off')) {
                $icon.removeClass('fa-volume-off').addClass('fa-volume-up');
                return 0;
            } else {
                $icon.removeClass('fa-volume-up').addClass('fa-volume-off');
                return 1;
            }
        };
        
        buttonsToShow = function (movi) {
            var video = movi.container.html5Video;
            
            return {
                play: true,
                volume: true,
                fullscreen: true,
                speed: true,
                cc: video.textTracks.length > 0,
                quality: video.moviq.sources.count > 1
            };
        };
        
        bindEvents = function (movi, btns) {
            var playBtn = getButtonHandle(movi, buttonHandles.play),
                ccButton = getButtonHandle(movi, buttonHandles.cc),
                speedBtn = getButtonHandle(movi, buttonHandles.speed),
                qualityBtn = getButtonHandle(movi, buttonHandles.quality),
                muteBtn = getButtonHandle(movi, buttonHandles.mute),
                fullscreenBtn = getButtonHandle(movi, buttonHandles.fullscreen);
            
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
        
        return {
            togglePlay: togglePlay,
            toggleCaptions: toggleCaptions,
            buttonsToShow: buttonsToShow,
            toggleFullscreen: toggleFullscreen,
            toggleMute: toggleMute,
            bindEvents: bindEvents
        };
        
    }()); // /buttons
    
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
    
    bindVideos = function (jqSelector) {
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
            result.push(new Video($(videos[i])));
        }
        
        return result;
    };
    
    exports.moviq = {
        bindTo: bindVideos,
        bindAll: bindVideos
    };
    
}(window, jQuery));
