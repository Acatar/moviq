/*! moviq-build 2015-03-04 */

/*!
// The IoC Container that all moviq components are registered in
*/
var moviqContainer = new Hilary();

moviqContainer.register({
    name: "locale::en_US",
    factory: {
        errors: {
            interfaces: {
                requiresImplementation: "An implementation is required to create a new instance of an interface",
                requiresProperty: "The implementation is missing a required property: ",
                requiresArguments: "The implementation of this function requires the arguments: "
            },
            jqButtons: {
                fullscreenNotSupported: "Sorry, we don't recognize your browser, so we can't toggle fullscreen mode."
            }
        }
    }
});

moviqContainer.register({
    name: "IButtons",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            self.togglePlay = impl.togglePlay;
            self.toggleFullscreen = impl.toggleFullscreen;
            self.toggleCaptions = impl.toggleCaptions;
            self.toggleMute = impl.toggleMute;
            self.toggleQuality = impl.toggleQuality;
            self.changeQuality = impl.changeQuality;
            self.toggleSpeed = impl.toggleSpeed;
            self.changeSpeed = impl.changeSpeed;
            self.toggleMore = impl.toggleMore;
        };
    }
});

moviqContainer.register({
    name: "IEventEmitter",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this;
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof implementation.emit !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "emit");
            }
            if (implementation.emit.length !== 2) {
                throw new Error(locale.errors.interfaces.requiresArguments + "type, data");
            }
            self.emit = implementation.emit;
        };
    }
});

moviqContainer.register({
    name: "IEvents",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(eventsImplementation) {
            var self = this, ignore = function() {};
            self.onLoadMetadata = eventsImplementation.onLoadMetadata || ignore;
            self.onTimeUpdate = eventsImplementation.onTimeUpdate || ignore;
            self.onCanPlay = eventsImplementation.onCanPlay || ignore;
            self.onCanPlayThrough = eventsImplementation.onCanPlayThrough || ignore;
            self.onVideoEnded = eventsImplementation.onVideoEnded || ignore;
            self.onSeeking = eventsImplementation.onSeeking || ignore;
            self.onSeekComplete = eventsImplementation.onSeekComplete || ignore;
            self.onWaiting = eventsImplementation.onWaiting || ignore;
            self.onError = eventsImplementation.onError || ignore;
            self.onPlay = eventsImplementation.onPlay || ignore;
            self.onPause = eventsImplementation.onPause || ignore;
            self.onShowCaptions = eventsImplementation.onShowCaptions || ignore;
            self.onHideCaptions = eventsImplementation.onHideCaptions || ignore;
            self.onToggleSpeed = eventsImplementation.onToggleSpeed || ignore;
            self.onChangeSpeed = eventsImplementation.onChangeSpeed || ignore;
            self.onToggleQuality = eventsImplementation.onToggleQuality || ignore;
            self.onChangeQuality = eventsImplementation.onChangeQuality || ignore;
            self.onSoundOn = eventsImplementation.onSoundOn || ignore;
            self.onSoundOff = eventsImplementation.onSoundOff || ignore;
            self.onFullscreenOn = eventsImplementation.onFullscreenOn || ignore;
            self.onFullscreenOff = eventsImplementation.onFullscreenOff || ignore;
        };
    }
});

moviqContainer.register({
    name: "IMoviq",
    dependencies: [ "locale", "eventHandlers" ],
    factory: function(locale, eventHandlers) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                eventHandlers.onError(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.bindTo !== "function") {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + "bindTo");
            }
            if (typeof impl.bindAll !== "function") {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + "bindAll");
            }
            self.bindTo = impl.bindTo;
            self.bindAll = impl.bindAll;
        };
    }
});

moviqContainer.register({
    name: "IProgressMeter",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.init !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "init");
            }
            if (implementation.init.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "iVideo");
            }
            self.init = impl.init;
        };
    }
});

moviqContainer.register({
    name: "ISource",
    dependencies: [ "locale", "eventHandlers" ],
    factory: function(locale, eventHandlers) {
        "use strict";
        return function(source) {
            var self = this;
            if (!source) {
                eventHandlers.onError(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof source.src !== "string") {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + "src");
            }
            if (typeof source.type !== "string") {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + "type");
            }
            if (typeof source.label !== "string") {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + "label");
            }
            self.src = source.src;
            self.type = source.type;
            self.label = source.label;
        };
    }
});

moviqContainer.register({
    name: "ISourceParser",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.getSources !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "getSources");
            }
            if (impl.getSources.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "iVideo");
            }
            self.getSources = impl.getSources;
        };
    }
});

moviqContainer.register({
    name: "ISourceManifestParser",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.getSourcesByManifest !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "getSourcesByManifest");
            }
            if (impl.getSourcesByManifest.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "iVideo");
            }
            self.getSourcesByManifest = impl.getSourcesByManifest;
        };
    }
});

moviqContainer.register({
    name: "IVideo",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            self.events = impl.events;
            self.buttons = impl.buttons;
            self.progress = impl.progress;
            self.manifest = impl.manifest;
            self.sources = impl.sources;
            self.dom = {
                handle: impl.dom.handle,
                video: impl.dom.video,
                controls: impl.dom.controls,
                header: impl.dom.header
            };
        };
    }
});

moviqContainer.register({
    name: "IVideoInitializer",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.bindVideos !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "bindVideos");
            }
            if (impl.bindVideos.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "querySelector");
            }
            self.bindVideos = impl.bindVideos;
        };
    }
});

moviqContainer.register({
    name: "consoleEventEmitter",
    dependencies: [ "locale", "IEventEmitter" ],
    factory: function(locale, IEventEmitter) {
        "use strict";
        return new IEventEmitter({
            emit: function(type, data) {
                console.log("moviq-event", [ type, data ]);
            }
        });
    }
});

moviqContainer.register({
    name: "defaultEventHandlers",
    dependencies: [ "locale", "eventEmitter" ],
    factory: function(locale, eventEmitter) {
        "use strict";
        var self = {};
        self.onError = function(message) {
            eventEmitter.emit("moviq-error", {
                message: message
            });
            throw new Error(message);
        };
        self.onPlay = function(event) {
            eventEmitter.emit("moviq-play", {
                event: event
            });
        };
        self.onPause = function(event) {
            eventEmitter.emit("moviq-pause", {
                event: event
            });
        };
        self.onShowCaptions = function(event) {
            eventEmitter.emit("moviq-show-captions", {
                event: event
            });
        };
        self.onHideCaptions = function(event) {
            eventEmitter.emit("moviq-hide-captions", {
                event: event
            });
        };
        self.onToggleSpeed = function(event) {
            eventEmitter.emit("moviq-toggle-speed", {
                event: event
            });
        };
        self.onChangeSpeed = function(event, speed) {
            eventEmitter.emit("moviq-change-speed", {
                speed: speed,
                event: event
            });
        };
        self.onToggleQuality = function(event) {
            eventEmitter.emit("moviq-toggle-quality", {
                event: event
            });
        };
        self.onChangeQuality = function(quality, event) {
            eventEmitter.emit("moviq-change-quality", {
                quality: quality,
                event: event
            });
        };
        self.onSoundOn = function(event) {
            eventEmitter.emit("moviq-sound-on", {
                event: event
            });
        };
        self.onSoundOff = function(event) {
            eventEmitter.emit("moviq-sound-off", {
                event: event
            });
        };
        self.onFullscreenOn = function(event) {
            eventEmitter.emit("moviq-fullscreen-on", {
                event: event
            });
        };
        self.onFullscreenOff = function(event) {
            eventEmitter.emit("moviq-fullscreen-off", {
                event: event
            });
        };
        return self;
    }
});

moviqContainer.register({
    name: "defaultHtmlTemplates",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        var controls;
        controls = '<div class="moviq-controls">' + '<div class="moviq-controls-enclosure">' + '<div class="moviq-controls-left">' + '    <button class="moviq-btn moviq-btn-play" title="Play/Pause video">' + '        <span class="fa fa-play"></span>' + "    </button>" + "</div>" + '<div class="moviq-progress">' + '    <span class="moviq-progress-display"></span>' + '    <span class="moviq-progress-picker"></span>' + '    <div class="moviq-progress-bar">' + '        <span class="moviq-progress-buffer"></span>' + '        <span class="moviq-progress-time"></span>' + "    </div>" + "</div>" + '<div class="moviq-controls-right">' + '    <div class="moviq-dropdown">' + '        <button class="moviq-btn moviq-dropdown-toggle" type="button" data-toggle="dropdown" title="Moviq Menu">' + '            <span class="fa fa-cog"></span>' + "        </button>" + '        <ul class="moviq-dropdown-menu" role="menu">' + '            <li role="presentation">' + '                <button class="moviq-btn moviq-btn-cc" role="menuitem" tabindex="-1" title="Closed Captions">' + '                    <i class="fa fa-cc"></i>' + "                </button>" + "            </li>" + '            <li role="presentation">' + '                <button class="moviq-btn moviq-btn-speed" role="menuitem" tabindex="-1" title="Playback Speed">' + '                    <i class="fa fa-clock-o"></i>' + "                </button>" + "            </li>" + '            <li role="presentation">' + '                <button class="moviq-btn moviq-btn-quality" role="menuitem" tabindex="-1" title="Video Quality">' + "                    <em>HD</em>" + "                </button>" + "            </li>" + "        </ul>" + "    </div>" + '    <button class="moviq-btn moviq-btn-mute" title="Mute/Unmute sound">' + '        <span class="fa fa-volume-off"></span>' + "    </button>" + '    <button class="moviq-btn moviq-btn-fullscreen" title="Switch to full screen">' + '        <span class="fa fa-arrows-alt"></span>' + "    </button>" + "</div>" + "</div>" + "</div>";
        return {
            controls: controls
        };
    }
});

moviqContainer.register({
    name: "IJqVideo",
    dependencies: [ "locale", "IVideo" ],
    factory: function(locale, IVideo) {
        "use strict";
        return function(implementation) {
            var self = new IVideo(implementation), impl = implementation || {};
            self.$dom = {
                $handle: impl.$dom.$handle,
                $video: impl.$dom.$video,
                $controls: impl.$dom.$controls,
                $header: impl.$dom.$header
            };
            return self;
        };
    }
});

moviqContainer.register({
    name: "jqButtons",
    dependencies: [ "locale", "jqQuerySelectors" ],
    factory: function(locale, querySelectors) {
        "use strict";
        var movi, $video, video, togglePlay, toggleCaptions, buttonsToShow, toggleFullscreen, fullscreenIn, fullscreenOut, toggleMute, toggleSpeed, changeSpeed, toggleSelected, toggleQuality, init, bindButtonEvents;
        togglePlay = function() {
            var playIcon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.play);
            if (video.paused || video.ended) {
                playIcon.removeClass("fa-play").addClass("fa-pause");
                video.play();
                return 1;
            } else {
                playIcon.removeClass("fa-pause").addClass("fa-play");
                video.pause();
                return 0;
            }
        };
        toggleFullscreen = function() {
            var container = movi.$dom.$handle;
            if (container.hasClass("fullscreen")) {
                fullscreenOut(movi);
                return 0;
            } else {
                fullscreenIn(movi);
                return 1;
            }
        };
        fullscreenIn = function() {
            var container = movi.dom.handle, $container = movi.$dom.$handle, $icon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.fullscreen);
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
            $container.addClass("fullscreen");
            $icon.removeClass("fa-arrows-alt").addClass("fa-compress");
        };
        fullscreenOut = function() {
            var $container = movi.$dom.$handle, $icon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.fullscreen);
            $container.removeClass("fullscreen");
            $icon.removeClass("fa-compress").addClass("fa-arrows-alt");
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        };
        toggleCaptions = function() {
            var ccButton = querySelectors.controls.getHandle(movi, querySelectors.controls.cc), track = video.textTracks[0];
            if (ccButton.hasClass("selected")) {
                ccButton.removeClass("selected");
                if (track) {
                    track.mode = "hidden";
                    return 0;
                }
            } else {
                ccButton.addClass("selected");
                if (track) {
                    track.mode = "showing";
                    return 1;
                }
            }
        };
        toggleMute = function() {
            var $icon = querySelectors.controls.getIconHandle(movi, querySelectors.controls.mute);
            video.muted = !video.muted;
            if ($icon.hasClass("fa-volume-off")) {
                $icon.removeClass("fa-volume-off").addClass("fa-volume-up");
                return 0;
            } else {
                $icon.removeClass("fa-volume-up").addClass("fa-volume-off");
                return 1;
            }
        };
        toggleSpeed = function() {
            var spdClass = "with-speed", speedButton = querySelectors.controls.getHandle(movi, querySelectors.controls.speed);
            toggleSelected(speedButton, "with-speed");
        };
        changeSpeed = function(speed) {
            if (typeof speed === "number") {
                var newSpeed = speed.toFixed(2), oldSpeed = video.playbackRate.toFixed(2);
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
            } else if (typeof speed === "string") {
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
        toggleQuality = function() {
            var spdClass = "with-quality", qualityButton = querySelectors.controls.getHandle(movi, querySelectors.controls.quality);
            toggleSelected(qualityButton, "with-quality");
        };
        toggleSelected = function($selection, containerClass) {
            if ($selection.hasClass("selected")) {
                $selection.removeClass("selected");
                movi.$dom.$controls.removeClass(containerClass);
            } else {
                var i;
                querySelectors.controls.getHandle(movi, ".selected").removeClass("selected");
                for (i = 0; i < querySelectors.controls.subMenus.length; i += 1) {
                    movi.$dom.$controls.removeClass(querySelectors.controls.subMenus[i]);
                }
                $selection.addClass("selected");
                movi.$dom.$controls.addClass(containerClass);
            }
        };
        buttonsToShow = function() {
            return {
                play: true,
                volume: true,
                fullscreen: true,
                speed: true,
                cc: video.textTracks.length > 0,
                quality: video.moviq.sources.count > 1
            };
        };
        bindButtonEvents = function(btns) {
            var playBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.play), ccButton = querySelectors.controls.getHandle(movi, querySelectors.controls.cc), speedBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.speed), qualityBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.quality), muteBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.mute), fullscreenBtn = querySelectors.controls.getHandle(movi, querySelectors.controls.fullscreen), speedChooser = querySelectors.controls.getHandle(movi, querySelectors.controls.speed_chooser), speedCurrent = querySelectors.controls.getHandle(movi, querySelectors.controls.speed_current);
            movi.$dom.$handle.on("mouseenter", function(event) {
                movi.$dom.$controls.stop().fadeTo(500, .9);
                movi.$dom.$header.stop().fadeTo(500, .9);
            }).on("mouseleave", function(event) {
                movi.$dom.$controls.stop().fadeOut();
                movi.$dom.$header.stop().fadeOut();
            });
            playBtn.on("click", function(event) {
                var state = btns.togglePlay();
                if (state === 1) {
                    movi.events.onPlay(event);
                } else if (state === 0) {
                    movi.events.onPause(event);
                }
            });
            ccButton.on("click", function(event) {
                var state = btns.toggleCaptions();
                if (state === 1) {
                    movi.events.onShowCaptions(event);
                } else if (state === 0) {
                    movi.events.onHideCaptions(event);
                }
            });
            speedBtn.on("click", function(event) {
                var speed = btns.toggleSpeed();
                movi.events.onToggleSpeed(event);
            });
            speedChooser.on("change mousemove", function(event) {
                var speed = btns.changeSpeed(speedChooser.val());
                speedCurrent.text(speedChooser.val() + "x");
                if (speed.changed) {
                    movi.events.onChangeSpeed(event, speed.newSpeed);
                }
            });
            qualityBtn.on("click", function(event) {
                var quality = btns.toggleQuality();
                movi.events.onToggleQuality(event);
            });
            muteBtn.on("click", function(event) {
                var state = btns.toggleMute();
                if (state === 1) {
                    movi.events.onSoundOn(event);
                } else if (state === 0) {
                    movi.events.onSoundOff(event);
                }
            });
            fullscreenBtn.on("click", function(event) {
                var state = btns.toggleFullscreen();
                if (state === 1) {
                    movi.events.onFullscreenOn(event);
                } else if (state === 0) {
                    movi.events.onFullscreenOff(event);
                }
            });
        };
        init = function(moviInstance) {
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

moviqContainer.register({
    name: "jqEventEmitter",
    dependencies: [ "locale", "IEventEmitter", "jQuery" ],
    factory: function(locale, IEventEmitter, $) {
        "use strict";
        return new IEventEmitter({
            emit: function(type, data) {
                $(document).trigger(type, [ data ]).trigger("moviq-event", [ type, data ]);
            }
        });
    }
});

moviqContainer.register({
    name: "jqProgressMeter",
    dependencies: [ "locale", "jqQuerySelectors", "IProgressMeter" ],
    factory: function(locale, querySelectors, IProgressMeter) {
        "use strict";
        var init = function(jqVideo) {
            var movi = jqVideo, $video, video, $bar, $timeBar, $bufferBar, $timeDisplay, init, bindProgressEvents, formatTime, coverage, meters, timePickerActive = false;
            $video = movi.$dom.$video;
            video = movi.dom.video;
            $bar = querySelectors.controls.getHandle(movi, querySelectors.controls.progress_bar);
            $timeBar = querySelectors.controls.getHandle(movi, querySelectors.controls.progress_time);
            $bufferBar = querySelectors.controls.getHandle(movi, querySelectors.controls.progress_buffer);
            $timeDisplay = querySelectors.controls.getHandle(movi, querySelectors.controls.progress_timeDisplay);
            coverage = {
                getPositionPercent: function() {
                    return 100 * (video.currentTime / video.duration);
                },
                getBufferedPercent: function() {
                    if (video.buffered.length > 0) {
                        return 100 * (video.buffered.end(0) / video.duration);
                    } else {
                        return 0;
                    }
                },
                getAmountConsumed: function() {
                    throw new Error("NOT IMPLEMENTED");
                }
            };
            meters = {
                setPosition: function(pageX) {
                    var percent = meters.getCoordinates(pageX).percent;
                    meters.updateDisplay(percent);
                    video.currentTime = video.duration * percent / 100;
                },
                getCoordinates: function(pageX) {
                    var position = pageX - $bar.offset().left, percent = 100 * position / $bar.width();
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
                getPosition: function(mousePageX) {
                    var coordinates = meters.getCoordinates(mousePageX), time = video.duration * (coordinates.percent / 100);
                    return {
                        time: formatTime(time),
                        left: coordinates.position
                    };
                },
                updateDisplay: function(positionPercent) {
                    var newPositionPercent = positionPercent || coverage.getPositionPercent(), bufferedPercent = coverage.getBufferedPercent(), currentTime = formatTime(video.currentTime);
                    if (video.duration > 0) {
                        currentTime += " / " + formatTime(video.duration);
                    }
                    $timeBar.css("width", newPositionPercent + "%");
                    $bufferBar.css("width", bufferedPercent + "%");
                    if (!timePickerActive) {
                        $timeDisplay.text(currentTime);
                    }
                }
            };
            formatTime = function(seconds) {
                var m, s;
                m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
                s = Math.floor(seconds - m * 60) < 10 ? "0" + Math.floor(seconds - m * 60) : Math.floor(seconds - m * 60);
                return m + ":" + s;
            };
            bindProgressEvents = function() {
                var $display = querySelectors.controls.getHandle(movi, querySelectors.controls.progress_timeDisplay), $picker = querySelectors.controls.getHandle(movi, querySelectors.controls.progress_timePicker);
                $video.on("timeupdate", function() {
                    meters.updateDisplay();
                });
                $bar.on("mousedown", function(event) {
                    meters.setPosition(event.pageX);
                }).on("mouseleave", function(event) {
                    $picker.text("");
                    timePickerActive = false;
                }).on("mousemove", function(event) {
                    var position = meters.getPosition(event.pageX);
                    timePickerActive = true;
                    $display.text("");
                    $picker.text(position.time);
                    $picker.css("left", position.left);
                });
            };
            bindProgressEvents();
            meters.updateDisplay();
        };
        return new IProgressMeter({
            init: init
        });
    }
});

moviqContainer.register({
    name: "jqQuerySelectors",
    factory: {
        header: ".moviq-header",
        controls: {
            control_container: ".moviq-controls",
            more_controls_container: ".moviq-controls-enclosure-more",
            play: ".moviq-btn-play",
            mute: ".moviq-btn-mute",
            fullscreen: ".moviq-btn-fullscreen",
            cc: ".moviq-btn-cc",
            choose_cc: ".moviq-btn-choose-cc",
            speed: ".moviq-btn-speed",
            speed_chooser: ".moviq-speed-chooser",
            speed_current: ".moviq-current-speed",
            choose_speed: ".moviq-btn-choose-speed",
            quality: ".moviq-btn-quality",
            choose_quality: ".moviq-btn-choose-quality",
            progress: ".moviq-progress",
            progress_bar: ".moviq-progress-bar",
            progress_buffer: ".moviq-progress-buffer",
            progress_time: ".moviq-progress-time",
            progress_timeDisplay: ".moviq-progress-display",
            progress_timePicker: ".moviq-progress-picker",
            buttons_right: ".moviq-buttons-right",
            controls_left: ".moviq-controls-left",
            controls_right: ".moviq-controls-right",
            subMenus: [ "with-speed", "with-quality", "with-cc" ],
            getHandle: function(movi, buttonHandle) {
                return movi.$dom.$controls.find(buttonHandle);
            },
            getIconHandle: function(movi, buttonHandle) {
                return movi.$dom.$controls.find(buttonHandle + " span");
            }
        }
    }
});

moviqContainer.register({
    name: "jqSourceParser",
    dependencies: [ "locale", "ISource", "ISourceParser", "jQuery" ],
    factory: function(locale, Source, ISourceParser, $) {
        "use strict";
        var getSource, getSources;
        getSources = function(movi) {
            var sources = [], source = getSource(movi.$dom.$video), childSources = movi.$dom.$video.children("source"), currentSource, i;
            if (source) {
                sources.push(source);
            }
            for (i = 0; i < childSources.length; i += 1) {
                currentSource = getSource($(childSources[i]), i);
                if (currentSource) {
                    sources.push(currentSource);
                }
            }
            return sources;
        };
        getSource = function($source, count) {
            var src = $source.attr("src"), type = $source.attr("type"), label = $source.attr("data-label");
            if (src && type) {
                return new Source({
                    src: src,
                    type: type,
                    label: label || "Q" + ((count || 0) + 1).toString()
                });
            }
            return null;
        };
        return new ISourceParser({
            getSources: getSources
        });
    }
});

moviqContainer.register({
    name: "jqVideo",
    dependencies: [ "locale", "IJqVideo", "jqQuerySelectors", "eventHandlers", "jqButtons", "jqProgressMeter", "sourceParser", "sourceManifestParser", "htmlTemplates" ],
    factory: function(locale, IJqVideo, querySelectors, eventHandlers, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplates) {
        "use strict";
        return function($videoContainer) {
            var self, existingControls = $videoContainer.find(querySelectors.controls.control_container), cc, btns, prog;
            self = new IJqVideo({
                events: eventHandlers,
                $dom: {
                    $handle: $videoContainer,
                    $video: $videoContainer.children("video").first(),
                    $controls: $videoContainer.children(querySelectors.controls.control_container).first(),
                    $header: $videoContainer.children(querySelectors.header).first()
                },
                dom: {
                    handle: $videoContainer[0],
                    video: $videoContainer.children("video").first()[0],
                    controls: $videoContainer.children(querySelectors.controls.control_container).first()[0],
                    header: $videoContainer.children(querySelectors.header).first()[0]
                }
            });
            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplates.controls);
            }
            self.buttons = jqButtons.init(self);
            self.progress = jqProgressMeter.init(self);
            self.manifest = self.dom.video.dataset.manifest;
            if (self.manifest) {
                self.sources = sourceManifestParser.getSourcesByManifest(self);
            } else {
                self.sources = sourceParser.getSources(self);
            }
            cc = self.dom.video.textTracks[0];
            if (cc) {
                cc.mode = "hidden";
            }
            $videoContainer.addClass("moviqified");
        };
    }
});

moviqContainer.register({
    name: "jqVideoInitializer",
    dependencies: [ "locale", "Video", "IVideoInitializer", "eventEmitter", "jQuery" ],
    factory: function(locale, Video, IVideoInitializer, eventEmitter, $) {
        "use strict";
        return new IVideoInitializer({
            bindVideos: function(jqSelector) {
                var videos, result = [], video, i, moviqified = ".moviqified";
                if (!jqSelector) {
                    videos = $(".moviq-video").not(moviqified);
                } else if (typeof jqSelector === "string") {
                    videos = $($(jqSelector).not(moviqified));
                } else if (jqSelector instanceof $) {
                    videos = jqSelector.not(moviqified);
                }
                if (videos.length === 0) {
                    console.log("moviq info", "no videos were found to process");
                }
                for (i = 0; i < videos.length; i += 1) {
                    result.push(new Video($(videos[i]), eventEmitter, locale));
                }
                return result;
            }
        });
    }
});

/*!
// The composition root. This is where we choose the implementations that will
// make up this instance of Moviq.
*/
(function(exports) {
    "use strict";
    var compose;
    /*!
    // The compose function does the work of choosing implementations, creating singletons,
    // and registering these decisions to be used by other modules.
    */
    compose = function(scope) {
        var locale, eventEmitter, sourceParser, sourceManifestParser, htmlTemplates, eventHandlers, Video, videoInitializer;
        /*!
        // Most of what we are trying to accomplish here, is to create singletons for instances that
        // can be re-used during the application lifecycle. We use a lazy-loading pattern here, resolving
        // the dependencies at the last minute, to avoid needing to keep these registrations in a certain order.
        */
        scope.register({
            name: "locale",
            factory: function() {
                if (!locale) {
                    locale = scope.resolve("locale::en_US");
                }
                return locale;
            }
        });
        scope.register({
            name: "eventEmitter",
            factory: function() {
                if (!eventEmitter) {
                    eventEmitter = scope.resolve("jqEventEmitter");
                }
                return eventEmitter;
            }
        });
        scope.register({
            name: "eventHandlers",
            factory: function() {
                if (!eventHandlers) {
                    eventHandlers = scope.resolve("defaultEventHandlers");
                }
                return eventHandlers;
            }
        });
        scope.register({
            name: "sourceParser",
            factory: function() {
                if (!sourceParser) {
                    sourceParser = scope.resolve("jqSourceParser");
                }
                return sourceParser;
            }
        });
        scope.register({
            name: "sourceManifestParser",
            factory: function() {
                if (!sourceManifestParser) {
                    sourceManifestParser = "NOT IMPLEMENTED";
                }
                return sourceManifestParser;
            }
        });
        scope.register({
            name: "htmlTemplates",
            factory: function() {
                if (!htmlTemplates) {
                    htmlTemplates = scope.resolve("defaultHtmlTemplates");
                }
                return htmlTemplates;
            }
        });
        scope.register({
            name: "Video",
            factory: function() {
                if (!Video) {
                    Video = scope.resolve("jqVideo");
                }
                return Video;
            }
        });
        scope.register({
            name: "videoInitializer",
            factory: function() {
                if (!videoInitializer) {
                    videoInitializer = scope.resolve("jqVideoInitializer");
                }
                return videoInitializer;
            }
        });
    };
    exports.Moviq = function(options) {
        var scope = moviqContainer, opts = options || {}, Moviq, initializer, output;
        compose(scope);
        Moviq = scope.resolve("IMoviq");
        initializer = scope.resolve("videoInitializer");
        //! Create an instance of IMoviq to return as the result
        output = new Moviq({
            bindTo: initializer.bindVideos,
            bindAll: initializer.bindVideos
        });
        if (opts.bindNow) {
            output.bindAll();
        }
        return output;
    };
})(window);
//# sourceMappingURL=moviq.js.map