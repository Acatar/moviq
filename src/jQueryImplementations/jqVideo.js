/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqVideo',
    dependencies: ['locale', 'IJqVideo', 'jqQuerySelectors', 'eventHandlers', 'jqButtons', 'jqProgressMeter', 'sourceParser', 'sourceManifestParser', 'htmlTemplateGenerator', 'jQuery'],
    factory: function (locale, IJqVideo, querySelectorsCtor, eventHandlers, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplateGenerator, $) {
        "use strict";
        
        var jqVideo,
            handleMoviqManifest,
            handleManifestUrl,
            handleHtml5Markup,
            addNotSupportedMessage,
            hideCC,
            addControls;
        
        // the manifest was passed in as an argument - scaffold out the video element
        handleMoviqManifest = function (self, manifest, querySelectors) {
            var scaffold = $('<div>');

            if (manifest.header) {
                scaffold.append(htmlTemplateGenerator.makeHeaderMarkup(manifest.header));
            }

            if (self.$dom.$video.length < 1) {
                scaffold.append(htmlTemplateGenerator.makeVideoMarkup(manifest.poster));
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
            var cc = self.dom.video.textTracks[0];

            if (cc) {
                cc.mode = 'hidden'; // showing // disabled
            }
        };
        
        addControls = function (self, querySelectors) {
            var existingControls = self.$dom.$handle.find(querySelectors.controls.control_container);
            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplateGenerator.makeControlsMarkup(self.sources, self.captions));
            }
            
            self.$dom.$controls = self.$dom.$handle.children(querySelectors.controls.control_container).first();
            self.dom.controls = self.$dom.$controls[0];
        };
        
        jqVideo = function ($videoContainer, manifest) {
            var self,
                querySelectors = querySelectorsCtor($videoContainer),
                btns,
                prog,
                controlsMarkup,
                i;
            
            self = new IJqVideo({
                events: eventHandlers,
                sources: undefined,
                captions: undefined,
                buttons: undefined,
                progress: undefined,
                manifestUrl: undefined,
                $dom: {
                    $handle: $videoContainer,
                    $video: $videoContainer.children('video').first(),
                    $controls: undefined,
                    $header: $videoContainer.children(querySelectors.header).first()
                },
                dom: {
                    handle: $videoContainer[0],
                    video: $videoContainer.children('video').first()[0],
                    controls: undefined,
                    header: $videoContainer.children(querySelectors.header).first()[0]
                }
            });
            
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
            
            return self;
        };
        
        return jqVideo;
    }
});
