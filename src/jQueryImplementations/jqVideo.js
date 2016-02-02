Hilary.scope('moviqContainer').register({
    name: 'jqVideo',
    dependencies: ['locale', 'IJqVideo', 'IManifest', 'jqQuerySelectors', 'defaultEventHandlers', 'jqEventEmitter', 'jqButtons', 'jqProgressMeter', 'sourceParser', 'sourceManifestParser', 'htmlTemplateGenerator', 'timeFormatter', 'WatchReport', 'jQuery'],
    factory: function (locale, IJqVideo, IManifest, querySelectorsCtor, eventHandlers, eventEmitter, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplateGenerator, timeFormatter, WatchReport, $) {
        'use strict';

        var jqVideo,
            handleMoviqManifest,
            handleManifestUrl,
            handleHtml5Markup,
            addNotSupportedMessage,
            hideCC,
            addControls;

        // the manifest was passed in as an argument - scaffold out the video element
        handleMoviqManifest = function (self, options, querySelectors) {
            var scaffold = $('<div>'),
                manifest = new IManifest(options),
                video;

            // add the snapshot canvas
            scaffold.append(htmlTemplateGenerator.makeSnapshotMarkup());

            if (manifest.header) {
                scaffold.append(htmlTemplateGenerator.makeHeaderMarkup(manifest.header));
            }

            if (self.$dom.$video.length < 1) {
                video = htmlTemplateGenerator.makeVideoMarkup(manifest.poster);
                video = $(video).attr('preload', 'none')[0];
                scaffold.append(video);
            }

            self.sources = sourceParser.convertSources(manifest.sources);
            self.captions = sourceParser.convertCaptions(manifest.captions);

            if (self.sources.length > 0) {
                scaffold.children('video')[0].src = self.sources[0].src;
            }

            if (self.captions.length > 0) {
                scaffold.children('video').append(htmlTemplateGenerator.makeCaptionMarkup(self.captions));
            }

            // replace the contents of the video container with the generated DOM
            self.$dom.$handle.html(scaffold.html());

            // set the DOM values on the IVideo
            self.$dom.$header = self.$dom.$handle.children(querySelectors.header).first();
            self.dom.header = self.$dom.$header[0];
            self.$dom.$video = self.$dom.$handle.children('video').first();
            self.dom.video = self.$dom.$video[0];
            self.$dom.$canvas = self.$dom.$handle.children(querySelectors.canvas).first();
            self.dom.canvas = self.$dom.$canvas[0];

            // preload the video, if the manifest defines preload
            // !do not move this: if preload is set while scaffolding out the video, it will be executed twice.
            if (manifest.preload) {
                self.$dom.$video.attr('preload', manifest.preload);
            }
        };

        // a manifest URL was provided in the DOM
        handleManifestUrl = function (self) {
            self.manifestUrl = self.dom.video.dataset.manifest;
            self.sources = sourceManifestParser.getSourcesByManifest(self.dom.video.dataset.manifest);
            self.captions = undefined; // TODO
        };

        // use the HTML5 markup
        handleHtml5Markup = function (self) {
            self.sources = sourceParser.getSources(self);
            self.captions = sourceParser.getCaptions(self); //self.dom.video.textTracks
        };

        // add a "browser not supported" message if it doesn't already exist
        addNotSupportedMessage = function (self) {
            if (self.$dom.$video.children('.video-not-supported').length < 1) {
                self.$dom.$video.append('<p class="video-not-supported">' + locale.messages.browserNotSupported + '</p>');
            }
        };

        // by default the first text track will be "showing". We want it to be hidden by default
        hideCC = function (self) {
            if (self.dom.video.textTracks.length > 0) {
                var cc = self.dom.video.textTracks[0];
                cc.mode = 'hidden'; // showing // disabled
            }
        };

        addControls = function (self, querySelectors) {
            var existingControls = self.$dom.$handle.find(querySelectors.controls.control_container),
                qualityControl;

            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplateGenerator.makeControlsMarkup(self.sources, self.captions));
            }

            self.$dom.$controls = self.$dom.$handle.children(querySelectors.controls.control_container).first();
            self.dom.controls = self.$dom.$controls[0];

            if (self.captions.length < 1) {
                self.$dom.$controls.find(querySelectors.controls.cc).attr('disabled', 'disabled').addClass('disabled');
            }

            qualityControl = self.$dom.$controls.find(querySelectors.controls.quality);

            if (self.sources.length < 2) {
                qualityControl.attr('disabled', 'disabled').addClass('disabled');
            }

            // update the source name
            qualityControl.children().first().text((self.sources[0] && self.sources[0].label));
        };

        jqVideo = function ($videoContainer, manifest) {
            var self,
                querySelectors = querySelectorsCtor($videoContainer);

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
                    $video: $videoContainer.children('video').first(),
                    $controls: undefined,
                    $header: $videoContainer.children(querySelectors.header).first(),
                    $canvas: undefined
                },
                dom: {
                    handle: $videoContainer[0],
                    video: $videoContainer.children('video').first()[0],
                    controls: undefined,
                    header: $videoContainer.children(querySelectors.header).first()[0],
                    canvas: undefined
                }
            });

            // add properties that require self to be passed into the constructors
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

            $videoContainer.addClass('moviqified');

            self.$dom.$video.one('loadedmetadata', function (/*event*/) {
                self.duration = timeFormatter.formatTime(self.dom.video.duration, false);
            });

            return self;
        };

        return jqVideo;
    }
});
