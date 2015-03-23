/*! moviq-build 2015-03-23 */

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
        },
        messages: {
            browserNotSupported: "Sorry, a browser that supports HTML5 video playback is required to view this content."
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
            self.changeCaption = impl.changeCaption;
            self.toggleMute = impl.toggleMute;
            self.toggleQuality = impl.toggleQuality;
            self.changeQuality = impl.changeQuality;
            self.toggleSpeed = impl.toggleSpeed;
            self.changeSpeed = impl.changeSpeed;
        };
    }
});

moviqContainer.register({
    name: "ICaption",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(caption) {
            var self = this;
            if (!caption) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof caption.src !== "string") {
                throw new Error(locale.errors.interfaces.requiresProperty + "src");
            }
            if (typeof caption.srclang !== "string") {
                throw new Error(locale.errors.interfaces.requiresProperty + "srclang");
            }
            if (typeof caption.label !== "string") {
                throw new Error(locale.errors.interfaces.requiresProperty + "label");
            }
            self.src = caption.src;
            self.srclang = caption.srclang;
            self.label = caption.label;
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
    name: "IHtmlTemplateGenerator",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.makeControlsMarkup !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "makeControlsMarkup");
            }
            if (impl.makeControlsMarkup.length !== 2) {
                throw new Error(locale.errors.interfaces.requiresArguments + "sources, captions");
            }
            if (typeof impl.makeSourceMarkup !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "makeSourceMarkup");
            }
            if (impl.makeSourceMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "iSourceArray");
            }
            if (typeof impl.makeCaptionMarkup !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "makeCaptionMarkup");
            }
            if (impl.makeCaptionMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "iCaptionArray");
            }
            if (typeof impl.makeHeaderMarkup !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "makeHeaderMarkup");
            }
            if (impl.makeHeaderMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "header");
            }
            if (typeof impl.makeVideoMarkup !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "makeVideoMarkup");
            }
            if (impl.makeVideoMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "poster");
            }
            self.makeControlsMarkup = impl.makeControlsMarkup;
            self.makeSourceMarkup = impl.makeSourceMarkup;
            self.makeCaptionMarkup = impl.makeCaptionMarkup;
            self.makeHeaderMarkup = impl.makeHeaderMarkup;
            self.makeVideoMarkup = impl.makeVideoMarkup;
        };
    }
});

moviqContainer.register({
    name: "IManifest",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(manifest) {
            var self = this, impl = manifest || {};
            self.poster = impl.poster;
            self.header = impl.header;
            self.preload = impl.preload;
            self.sources = impl.sources instanceof Array ? impl.sources : [];
            self.captions = impl.captions instanceof Array ? impl.captions : [];
        };
    }
});

moviqContainer.register({
    name: "IMoviq",
    dependencies: [ "locale", "IManifest" ],
    factory: function(locale, IManifest) {
        "use strict";
        return function(implementation) {
            var self = this, impl = implementation || {};
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof impl.ify !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "ify");
            }
            if (typeof impl.bindAll !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "bindAll");
            }
            self.ify = impl.ify;
            self.bindAll = impl.bindAll;
            self.Manifest = IManifest;
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
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(source) {
            var self = this;
            if (!source) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            if (typeof source.src !== "string") {
                throw new Error(locale.errors.interfaces.requiresProperty + "src");
            }
            if (typeof source.type !== "string") {
                throw new Error(locale.errors.interfaces.requiresProperty + "type");
            }
            if (typeof source.label !== "string") {
                throw new Error(locale.errors.interfaces.requiresProperty + "label");
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
            if (typeof impl.getCaptions !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "getCaptions");
            }
            if (impl.getCaptions.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "iVideo");
            }
            if (typeof impl.convertSources !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "convertSources");
            }
            if (impl.convertSources.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "sourceArray");
            }
            if (typeof impl.convertCaptions !== "function") {
                throw new Error(locale.errors.interfaces.requiresProperty + "convertCaptions");
            }
            if (impl.convertCaptions.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + "captionArray");
            }
            /*!
            // gets the source elements from a video element and converts them to ISource objects
            // @param iVideo (IVideo): the moviq IVideo object to get the sources for
            // @returns an Array of ISource objects
            */
            self.getSources = impl.getSources;
            /*!
            // gets the track elements from a video element and converts them to ICaption objects
            // @param iVideo (IVideo): the moviq IVideo object to get the tracks for
            // @returns an Array of ICaption objects
            */
            self.getCaptions = impl.getCaptions;
            /*!
            // converts an array of Object Literals into an array of ISource objects, thus
            // enforcing the interface.
            // @param sourceArray (Array): the array of sources to convert
            // @returns an Array of ISource objects
            */
            self.convertSources = impl.convertSources;
            /*!
            // converts an array of Object Literals into an array of ICaption objects, thus
            // enforcing the interface.
            // @param captionArray (Array): the array of captions to convert
            // @returns an Array of ICaption objects
            */
            self.convertCaptions = impl.convertCaptions;
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
        return function(implementation, manifest) {
            var self = this, impl = implementation || {};
            self.events = impl.events;
            self.sources = impl.sources;
            self.captions = impl.captions;
            self.buttons = impl.buttons;
            self.progressMeter = impl.progressMeter;
            self.manifestUrl = impl.manifestUrl;
            self.watchReport = impl.watchReport;
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
            if (impl.bindVideos.length !== 2) {
                throw new Error(locale.errors.interfaces.requiresArguments + "querySelector, manifest");
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
        return function(movi) {
            return new IEventEmitter({
                emit: function(type, data) {
                    console.log("moviq-event", [ type, data ]);
                    var dat = data, watch;
                    delete dat.event;
                    watch = {
                        type: type,
                        data: dat,
                        position: movi.dom.video.currentTime,
                        eventTime: new Date().toISOString()
                    };
                    movi.watchReport.events.push(watch);
                    movi.watchReport.updateCoverageReport();
                }
            });
        };
    }
});

moviqContainer.register({
    name: "defaultEventHandlers",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(eventEmitter) {
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
            self.onShowCaptions = function(lang, event) {
                eventEmitter.emit("moviq-show-captions", {
                    language: lang,
                    event: event
                });
            };
            self.onHideCaptions = function(lang, event) {
                eventEmitter.emit("moviq-hide-captions", {
                    language: lang,
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
        };
    }
});

moviqContainer.register({
    name: "defaultHtmlTemplates",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        var controls, qualityButton, ccButton, sourceElement, trackElement, header, video, videoWithPoster;
        controls = '<div class="moviq-controls">' + '<div class="moviq-controls-enclosure-more moviq-controls-quality">' + "</div>" + '<div class="moviq-controls-enclosure-more moviq-controls-speed">' + '<output class=" moviq-btn-text moviq-current-speed">1x</output>' + '<input class="moviq-speed-chooser" type="range" min=".25" max="3" step=".25" value="1" aria-label="Choose a playback speed" />' + "</div>" + '<div class="moviq-controls-enclosure-more moviq-controls-cc">' + "</div>" + '<div class="moviq-controls-enclosure">' + '<div class="moviq-controls-left">' + '<button class="moviq-btn moviq-btn-play" aria-label="Play or pause the video">' + '<span class="fa fa-play"></span>' + "</button>" + "</div>" + '<div class="moviq-progress">' + '<span class="moviq-progress-display"></span>' + '<span class="moviq-progress-picker"></span>' + '<div class="moviq-progress-bar" aria-label="This bar shows the current position of the video, as well as the amount buffered. You can click anywhere in this bar to seek to a new position.">' + '<span class="moviq-progress-buffer"></span>' + '<span class="moviq-progress-time"></span>' + "</div>" + "</div>" + '<div class="moviq-controls-right">' + '<button class="moviq-btn moviq-btn-cc" aria-label="Toggle closed captions. This will open a menu, if more than one text track is available.">' + '<i class="fa fa-cc"></i>' + "</button>" + '<button class="moviq-btn moviq-btn-speed moviq-btn-submenu" aria-label="Toggle the controls for choosing a playback speed">' + '<i class="fa fa-clock-o"></i>' + "</button>" + '<button class="moviq-btn moviq-btn-quality moviq-btn-submenu moviq-btn-text" aria-label="Toggle the video quality options">' + "<em>HD</em>" + "</button>" + '<button class="moviq-btn moviq-btn-mute" aria-label="Mute or unmute sound">' + '<span class="fa fa-volume-off"></span>' + "</button>" + '<button class="moviq-btn moviq-btn-fullscreen" aria-label="Toggle fullscreen">' + '<span class="fa fa-arrows-alt"></span>' + "</button>" + "</div>" + "</div>" + "</div>";
        qualityButton = '<button class="moviq-btn moviq-btn-choose-quality moviq-btn-text" aria-label="Set the video quality to: {0}" data-quality="{0}">' + "<em>{0}</em>" + "</button>";
        ccButton = '<button class="moviq-btn moviq-btn-choose-cc moviq-btn-text" aria-label="Set the closed captions to: {lang}" data-lang="{lang}" data-id="{id}">' + "<em>{lang}</em>" + "</button>";
        sourceElement = '<source type="{type}" data-label="{label}" src="{src}" />';
        trackElement = '<track label="{label}" kind="captions" srclang="{srclang}" src="{src}" data-id="{id}">';
        header = '<div class="moviq-header">{header}</div>';
        video = "<video>" + '<p class="video-not-supported">' + locale.messages.browserNotSupported + "</p>" + "</video>";
        videoWithPoster = '<video poster="{poster}">' + '<p class="video-not-supported">' + locale.messages.browserNotSupported + "</p>" + "</video>";
        return {
            controls: controls,
            qualityButton: qualityButton,
            ccButton: ccButton,
            sourceElement: sourceElement,
            trackElement: trackElement,
            header: header,
            video: video,
            videoWithPoster: videoWithPoster
        };
    }
});

moviqContainer.register({
    name: "simpleEventEmitter",
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
    name: "IJqVideo",
    dependencies: [ "locale", "IVideo" ],
    factory: function(locale, IVideo) {
        "use strict";
        return function(implementation, manifest) {
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
    dependencies: [ "locale", "jqQuerySelectors", "IButtons", "jQuery" ],
    factory: function(locale, querySelectorsCtor, IButtons, $) {
        "use strict";
        var init, bindButtonEvents, handlers;
        bindButtonEvents = function(movi, btns, querySelectors) {
            var playBtn = querySelectors.controls.getHandle(querySelectors.controls.play), ccButton = querySelectors.controls.getHandle(querySelectors.controls.cc), ccChoice = querySelectors.controls.getHandle(querySelectors.controls.cc_choice), speedBtn = querySelectors.controls.getHandle(querySelectors.controls.speed), qualityBtn = querySelectors.controls.getHandle(querySelectors.controls.quality), qualityChoice = querySelectors.controls.getHandle(querySelectors.controls.quality_choice), muteBtn = querySelectors.controls.getHandle(querySelectors.controls.mute), fullscreenBtn = querySelectors.controls.getHandle(querySelectors.controls.fullscreen), speedChooser = querySelectors.controls.getHandle(querySelectors.controls.speed_chooser), speedCurrent = querySelectors.controls.getHandle(querySelectors.controls.speed_current);
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
            ccChoice.on("click", function(event) {
                var self = $(event.currentTarget), state = btns.changeCaption(self);
                if (state.toggle === 1) {
                    movi.events.onShowCaptions(state.lang, event);
                } else if (state.toggle === 0) {
                    movi.events.onHideCaptions(state.lang, event);
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
            qualityChoice.on("click", function(event) {
                var self = $(event.currentTarget), label = self.attr("data-quality"), quality = btns.changeQuality(label);
                movi.events.onChangeQuality(quality);
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
        handlers = function(movi, querySelectors) {
            var $video = movi.$dom.$video, video = movi.dom.video, togglePlay, toggleCaptions, toggleTextTrack, changeCaption, buttonsToShow, toggleFullscreen, fullscreenIn, fullscreenOut, toggleMute, toggleSpeed, changeSpeed, toggleSubmenu, toggleQuality, changeQuality;
            togglePlay = function() {
                var playIcon = querySelectors.controls.getIconHandle(querySelectors.controls.play);
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
                var container = movi.dom.handle, $container = movi.$dom.$handle, $icon = querySelectors.controls.getIconHandle(querySelectors.controls.fullscreen);
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
                var container = movi.dom.handle, $container = movi.$dom.$handle, $icon = querySelectors.controls.getIconHandle(querySelectors.controls.fullscreen);
                $container.removeClass("fullscreen");
                $icon.removeClass("fa-compress").addClass("fa-arrows-alt");
                if (container.exitFullscreen) {
                    container.exitFullscreen();
                } else if (container.msExitFullscreen) {
                    container.msExitFullscreen();
                } else if (container.mozCancelFullScreen) {
                    container.mozCancelFullScreen();
                } else if (container.webkitExitFullscreen) {
                    container.webkitExitFullscreen();
                }
            };
            toggleCaptions = function() {
                var ccButton = querySelectors.controls.getHandle(querySelectors.controls.cc), track = video.textTracks[0], moreThanOne = video.textTracks.length > 1;
                if (moreThanOne) {
                    return toggleSubmenu(ccButton, "with-cc");
                } else {
                    return toggleTextTrack(ccButton, movi.captions[0].srclang, track);
                }
            };
            toggleTextTrack = function(ccButton, lang, track) {
                if (ccButton.hasClass("selected")) {
                    ccButton.removeClass("selected");
                    if (track) {
                        track.mode = "hidden";
                        return {
                            state: 0,
                            lang: lang
                        };
                    }
                } else {
                    ccButton.addClass("selected");
                    if (track) {
                        track.mode = "showing";
                        return {
                            state: 1,
                            lang: lang
                        };
                    }
                }
            };
            changeCaption = function(choiceButton) {
                var lang = choiceButton.attr("data-lang"), i = parseInt(choiceButton.attr("data-id"), 10), track = video.textTracks[i];
                return toggleTextTrack(choiceButton, lang, track);
            };
            toggleMute = function() {
                var $icon = querySelectors.controls.getIconHandle(querySelectors.controls.mute);
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
                var spdClass = "with-speed", speedButton = querySelectors.controls.getHandle(querySelectors.controls.speed);
                toggleSubmenu(speedButton, "with-speed");
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
                var spdClass = "with-quality", qualityButton = querySelectors.controls.getHandle(querySelectors.controls.quality);
                toggleSubmenu(qualityButton, "with-quality");
            };
            changeQuality = function(label) {
                var source, position, i;
                for (i = 0; i < movi.sources.length; i += 1) {
                    if (movi.sources[i].label === label) {
                        source = movi.sources[i];
                        break;
                    }
                }
                querySelectors.controls.getHandle(querySelectors.controls.quality + " em").text(source.label);
                position = video.currentTime;
                if (!video.paused) {
                    togglePlay();
                }
                video.src = source.src;
                video.load();
                $video.one("loadedmetadata", function(event) {
                    video.currentTime = position;
                    togglePlay();
                });
                return source;
            };
            toggleSubmenu = function($selection, containerClass) {
                if ($selection.hasClass("selected")) {
                    $selection.removeClass("selected");
                    movi.$dom.$controls.removeClass(containerClass);
                } else {
                    var i;
                    querySelectors.controls.getHandle(querySelectors.controls.subMenuButton + ".selected").removeClass("selected");
                    for (i = 0; i < querySelectors.controls.subMenus.length; i += 1) {
                        movi.$dom.$controls.removeClass(querySelectors.controls.subMenus[i]);
                    }
                    $selection.addClass("selected");
                    movi.$dom.$controls.addClass(containerClass);
                }
            };
            return new IButtons({
                togglePlay: togglePlay,
                toggleCaptions: toggleCaptions,
                changeCaption: changeCaption,
                toggleFullscreen: toggleFullscreen,
                toggleMute: toggleMute,
                toggleSpeed: toggleSpeed,
                changeSpeed: changeSpeed,
                toggleQuality: toggleQuality,
                changeQuality: changeQuality
            });
        };
        init = function(moviInstance) {
            var querySelectors = querySelectorsCtor(moviInstance), handls = handlers(moviInstance, querySelectors);
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

moviqContainer.register({
    name: "jqEventEmitter",
    dependencies: [ "locale", "IEventEmitter", "jQuery" ],
    factory: function(locale, IEventEmitter, $) {
        "use strict";
        return function(movi) {
            return new IEventEmitter({
                emit: function(type, data) {
                    $(document).trigger(type, [ data ]).trigger("moviq-event", [ type, data ]);
                    var dat = data, watch;
                    delete dat.event;
                    watch = {
                        type: type,
                        data: dat,
                        position: movi.dom.video.currentTime,
                        eventTime: new Date().toISOString()
                    };
                    movi.watchReport.events.push(watch);
                    movi.watchReport.updateCoverageReport();
                }
            });
        };
    }
});

moviqContainer.register({
    name: "jqHtmlTemplateGenerator",
    dependencies: [ "locale", "defaultHtmlTemplates", "IHtmlTemplateGenerator", "jqQuerySelectors", "jQuery" ],
    factory: function(locale, htmlTemplates, IHtmlTemplateGenerator, querySelectorsCtor, $) {
        "use strict";
        var makeControlsMarkup, makeSourceMarkup, makeCaptionMarkup, makeHeaderMarkup, makeVideoMarkup;
        makeControlsMarkup = function(sources, captions) {
            var $markup, $qualityMenu, $ccMenu, querySelectors = querySelectorsCtor(), i;
            $markup = $(htmlTemplates.controls);
            $qualityMenu = $markup.find(querySelectors.controls.quality_menu);
            $ccMenu = $markup.find(querySelectors.controls.cc_menu);
            for (i = 0; i < sources.length; i += 1) {
                $qualityMenu.append(htmlTemplates.qualityButton.replace(/\{0\}/g, sources[i].label));
            }
            if (captions) {
                for (i = 0; i < captions.length; i += 1) {
                    $ccMenu.append(htmlTemplates.ccButton.replace(/\{lang\}/g, captions[i].label).replace(/\{id\}/g, i.toString()));
                }
            }
            return $markup[0];
        };
        makeSourceMarkup = function(iSourceArray) {
            var i, markup = "";
            for (i = 0; i < iSourceArray.length; i += 1) {
                markup += htmlTemplates.sourceElement.replace(/\{type\}/, iSourceArray[i].type).replace(/\{label\}/, iSourceArray[i].label).replace(/\{src\}/, iSourceArray[i].src);
            }
            return markup;
        };
        makeCaptionMarkup = function(iCaptionArray) {
            var i, markup = "";
            for (i = 0; i < iCaptionArray.length; i += 1) {
                markup += htmlTemplates.trackElement.replace(/\{label\}/, iCaptionArray[i].label).replace(/\{srclang\}/, iCaptionArray[i].srclang).replace(/\{src\}/, iCaptionArray[i].src).replace(/\{id\}/, i.toString());
            }
            return markup;
        };
        makeHeaderMarkup = function(header) {
            return htmlTemplates.header.replace(/\{header\}/, header);
        };
        makeVideoMarkup = function(poster) {
            if (poster) {
                return htmlTemplates.videoWithPoster.replace(/\{poster\}/, poster);
            } else {
                return htmlTemplates.video;
            }
        };
        return new IHtmlTemplateGenerator({
            makeControlsMarkup: makeControlsMarkup,
            makeSourceMarkup: makeSourceMarkup,
            makeCaptionMarkup: makeCaptionMarkup,
            makeHeaderMarkup: makeHeaderMarkup,
            makeVideoMarkup: makeVideoMarkup
        });
    }
});

moviqContainer.register({
    name: "jqProgressMeter",
    dependencies: [ "locale", "jqQuerySelectors", "IProgressMeter" ],
    factory: function(locale, querySelectorsCtor, IProgressMeter) {
        "use strict";
        var init = function(movi) {
            var querySelectors = querySelectorsCtor(movi), $video, video, $bar, $timeBar, $bufferBar, $timeDisplay, init, bindProgressEvents, formatTime, coverage, meters, timePickerActive = false;
            $video = movi.$dom.$video;
            video = movi.dom.video;
            $bar = querySelectors.controls.getHandle(querySelectors.controls.progress_bar);
            $timeBar = querySelectors.controls.getHandle(querySelectors.controls.progress_time);
            $bufferBar = querySelectors.controls.getHandle(querySelectors.controls.progress_buffer);
            $timeDisplay = querySelectors.controls.getHandle(querySelectors.controls.progress_timeDisplay);
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
                    video.pause();
                    meters.updateDisplay(percent);
                    video.currentTime = video.duration * percent / 100;
                    video.play();
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
                var $display = querySelectors.controls.getHandle(querySelectors.controls.progress_timeDisplay), $picker = querySelectors.controls.getHandle(querySelectors.controls.progress_timePicker);
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
                    $picker.text(position.time.replace(/NaN/gi, "00"));
                    $picker.css("left", position.left);
                });
            };
            bindProgressEvents();
            meters.updateDisplay();
            return meters;
        };
        return new IProgressMeter({
            init: init
        });
    }
});

moviqContainer.register({
    name: "jqQuerySelectors",
    factory: function(movi) {
        "use strict";
        return {
            header: ".moviq-header",
            controls: {
                control_container: ".moviq-controls",
                more_controls_container: ".moviq-controls-enclosure-more",
                play: ".moviq-btn-play",
                mute: ".moviq-btn-mute",
                fullscreen: ".moviq-btn-fullscreen",
                cc: ".moviq-btn-cc",
                cc_choice: ".moviq-btn-choose-cc",
                cc_menu: ".moviq-controls-cc",
                speed: ".moviq-btn-speed",
                speed_chooser: ".moviq-speed-chooser",
                speed_current: ".moviq-current-speed",
                choose_speed: ".moviq-btn-choose-speed",
                quality_menu: ".moviq-controls-quality",
                quality: ".moviq-btn-quality",
                quality_choice: ".moviq-btn-choose-quality",
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
                subMenuButtonClassName: "moviq-btn-submenu",
                subMenuButton: ".moviq-btn-submenu",
                getHandle: function(buttonHandle) {
                    return movi.$dom.$controls.find(buttonHandle);
                },
                getIconHandle: function(buttonHandle) {
                    return movi.$dom.$controls.find(buttonHandle + " span");
                }
            }
        };
    }
});

moviqContainer.register({
    name: "jqSourceParser",
    dependencies: [ "locale", "ISource", "ICaption", "ISourceParser", "jQuery" ],
    factory: function(locale, ISource, ICaption, ISourceParser, $) {
        "use strict";
        var getSource, getSources, getCaption, getCaptions, convertSources, convertCaptions;
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
                return new ISource({
                    src: src,
                    type: type,
                    label: label || "Q" + ((count || 0) + 1).toString()
                });
            }
            return null;
        };
        getCaptions = function(movi) {
            var captions = [], tracks = movi.$dom.$video.children("track"), currentCaption, i;
            for (i = 0; i < tracks.length; i += 1) {
                currentCaption = getCaption($(tracks[i]), i);
                if (currentCaption) {
                    captions.push(currentCaption);
                }
            }
            return captions;
        };
        getCaption = function($caption, count) {
            var src = $caption.attr("src"), lang = $caption.attr("srclang"), label = $caption.attr("label"), kind = $caption.attr("kind");
            if (src && lang && kind === "captions") {
                return new ICaption({
                    src: src,
                    srclang: lang,
                    label: label || "unknown"
                });
            }
            return null;
        };
        convertSources = function(sourceArray) {
            var i, sources = [];
            for (i = 0; i < sourceArray.length; i += 1) {
                sources.push(new ISource(sourceArray[i]));
            }
            return sources;
        };
        convertCaptions = function(captionArray) {
            var i, captions = [];
            for (i = 0; i < captionArray.length; i += 1) {
                captions.push(new ICaption(captionArray[i]));
            }
            return captions;
        };
        return new ISourceParser({
            getSources: getSources,
            getCaptions: getCaptions,
            convertSources: convertSources,
            convertCaptions: convertCaptions
        });
    }
});

moviqContainer.register({
    name: "jqVideo",
    dependencies: [ "locale", "IJqVideo", "IManifest", "jqQuerySelectors", "defaultEventHandlers", "jqEventEmitter", "jqButtons", "jqProgressMeter", "sourceParser", "sourceManifestParser", "htmlTemplateGenerator", "WatchReport", "jQuery" ],
    factory: function(locale, IJqVideo, IManifest, querySelectorsCtor, eventHandlers, eventEmitter, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplateGenerator, WatchReport, $) {
        "use strict";
        var jqVideo, handleMoviqManifest, handleManifestUrl, handleHtml5Markup, addNotSupportedMessage, hideCC, addControls;
        handleMoviqManifest = function(self, options, querySelectors) {
            var scaffold = $("<div>"), manifest = new IManifest(options), video;
            if (manifest.header) {
                scaffold.append(htmlTemplateGenerator.makeHeaderMarkup(manifest.header));
            }
            if (self.$dom.$video.length < 1) {
                video = htmlTemplateGenerator.makeVideoMarkup(manifest.poster);
                video = $(video).attr("preload", "none")[0];
                scaffold.append(video);
            }
            self.sources = sourceParser.convertSources(manifest.sources);
            self.captions = sourceParser.convertCaptions(manifest.captions);
            if (self.sources.length > 0) {
                scaffold.children("video")[0].src = self.sources[0].src;
            }
            if (self.captions.length > 0) {
                scaffold.children("video").append(htmlTemplateGenerator.makeCaptionMarkup(self.captions));
            }
            self.$dom.$handle.html(scaffold.html());
            self.$dom.$header = self.$dom.$handle.children(querySelectors.header).first();
            self.dom.header = self.$dom.$header[0];
            self.$dom.$video = self.$dom.$handle.children("video").first();
            self.dom.video = self.$dom.$video[0];
            if (manifest.preload) {
                self.$dom.$video.attr("preload", manifest.preload);
            }
        };
        handleManifestUrl = function(self) {
            self.manifestUrl = self.dom.video.dataset.manifest;
            self.sources = sourceManifestParser.getSourcesByManifest(self.dom.video.dataset.manifest);
            self.captions = undefined;
        };
        handleHtml5Markup = function(self) {
            self.sources = sourceParser.getSources(self);
            self.captions = sourceParser.getCaptions(self);
        };
        addNotSupportedMessage = function(self) {
            if (self.$dom.$video.children(".video-not-supported").length < 1) {
                self.$dom.$video.append('<p class="video-not-supported">' + locale.messages.browserNotSupported + "</p>");
            }
        };
        hideCC = function(self) {
            var cc = self.dom.video.textTracks[0];
            if (cc) {
                cc.mode = "hidden";
            }
        };
        addControls = function(self, querySelectors) {
            var existingControls = self.$dom.$handle.find(querySelectors.controls.control_container);
            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplateGenerator.makeControlsMarkup(self.sources, self.captions));
            }
            self.$dom.$controls = self.$dom.$handle.children(querySelectors.controls.control_container).first();
            self.dom.controls = self.$dom.$controls[0];
        };
        jqVideo = function($videoContainer, manifest) {
            var self, querySelectors = querySelectorsCtor($videoContainer), btns, prog, controlsMarkup, i;
            self = new IJqVideo({
                events: undefined,
                sources: undefined,
                captions: undefined,
                buttons: undefined,
                progress: undefined,
                manifestUrl: undefined,
                watchReport: undefined,
                $dom: {
                    $handle: $videoContainer,
                    $video: $videoContainer.children("video").first(),
                    $controls: undefined,
                    $header: $videoContainer.children(querySelectors.header).first()
                },
                dom: {
                    handle: $videoContainer[0],
                    video: $videoContainer.children("video").first()[0],
                    controls: undefined,
                    header: $videoContainer.children(querySelectors.header).first()[0]
                }
            });
            self.events = eventHandlers(eventEmitter(self));
            self.watchReport = new WatchReport(self);
            if (manifest) {
                handleMoviqManifest(self, manifest, querySelectors);
            } else if (self.dom.video.dataset.manifest) {
                handleManifestUrl(self);
            } else {
                handleHtml5Markup(self);
            }
            addNotSupportedMessage(self);
            hideCC(self);
            addControls(self, querySelectors);
            self.buttons = jqButtons.init(self);
            self.progressMeter = jqProgressMeter.init(self);
            $videoContainer.addClass("moviqified");
            return self;
        };
        return jqVideo;
    }
});

moviqContainer.register({
    name: "jqVideoInitializer",
    dependencies: [ "locale", "Video", "IVideoInitializer", "jQuery" ],
    factory: function(locale, Video, IVideoInitializer, $) {
        "use strict";
        return new IVideoInitializer({
            bindVideos: function(jqSelector, manifest) {
                var videos, result = [], video, i, moviqified = ".moviqified";
                if (!jqSelector) {
                    videos = $(".moviq-video").not(moviqified);
                } else if (typeof jqSelector === "string") {
                    videos = $(jqSelector).not(moviqified);
                } else if (jqSelector instanceof $) {
                    videos = jqSelector.not(moviqified);
                }
                if (videos.length === 0) {
                    console.log("moviq info", "no videos were found to process");
                }
                for (i = 0; i < videos.length; i += 1) {
                    result.push(new Video($(videos[i]), manifest));
                }
                return result;
            }
        });
    }
});

moviqContainer.register({
    name: "CoverageReport",
    dependencies: [ "locale" ],
    factory: function(locale) {
        "use strict";
        return function(data) {
            var self = this, dat = data || {};
            self.timeRanges = dat.timeRanges;
            self.duration = dat.duration;
            self.durationConsumed = dat.durationConsumed;
            self.coverageAsPercent = dat.coverageAsPercent;
            self.roundedCoverageAsPercent = Math.round(dat.coverageAsPercent);
        };
    }
});

moviqContainer.register({
    name: "WatchReport",
    dependencies: [ "locale", "CoverageReport" ],
    factory: function(locale, CoverageReport) {
        "use strict";
        return function(movi) {
            var self = this;
            self.events = [];
            self.coverageReport = undefined;
            self.updateCoverageReport = function() {
                var videoElement = movi.dom.video, i, timeRange, timeRanges = [], durationConsumed = 0, coverage = 0, veTimeRanges = videoElement.played || {}, duration = videoElement.duration;
                for (i = 0; i < veTimeRanges.length; i += 1) {
                    timeRange = {
                        start: veTimeRanges.start(i),
                        end: veTimeRanges.end(i)
                    };
                    timeRanges.push(timeRange);
                    durationConsumed += timeRange.end - timeRange.start;
                }
                coverage = durationConsumed * 100 / duration;
                self.coverageReport = new CoverageReport({
                    timeRanges: timeRanges,
                    duration: duration,
                    durationConsumed: durationConsumed,
                    coverageAsPercent: coverage
                });
                return self.coverageReport;
            };
        };
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
        var locale, sourceParser, sourceManifestParser, htmlTemplateGenerator, Video, videoInitializer;
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
            name: "htmlTemplateGenerator",
            factory: function() {
                if (!htmlTemplateGenerator) {
                    htmlTemplateGenerator = scope.resolve("jqHtmlTemplateGenerator");
                }
                return htmlTemplateGenerator;
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
            ify: initializer.bindVideos,
            bindAll: initializer.bindVideos
        });
        if (opts.bindNow) {
            output.bindAll();
        }
        return output;
    };
})(window);
//# sourceMappingURL=moviq.js.map