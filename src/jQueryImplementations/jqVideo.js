/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqVideo',
    dependencies: ['locale', 'IJqVideo', 'jqQuerySelectors', 'eventHandlers', 'jqButtons', 'jqProgressMeter', 'sourceParser', 'sourceManifestParser', 'htmlTemplateGenerator'],
    factory: function (locale, IJqVideo, querySelectorsCtor, eventHandlers, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplateGenerator) {
        "use strict";
        
        return function ($videoContainer, manifest) {
            var self,
                querySelectors = querySelectorsCtor($videoContainer),
                existingControls = $videoContainer.find(querySelectors.controls.control_container),
                cc,
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
                // the manifest was passed in as an argument -
                // scaffold out the video element
                if (manifest.header) {
                    self.$dom.$handle.append(htmlTemplateGenerator.makeHeaderMarkup(manifest.header));
                    self.$dom.$header = self.$dom.$handle.children(querySelectors.header).first();
                    self.dom.header = self.$dom.$header[0];
                }
                
                if (self.$dom.$video.length < 1) {
                    self.$dom.$handle.append(htmlTemplateGenerator.makeVideoMarkup(manifest.poster));
                    self.$dom.$video = self.$dom.$handle.children('video').first();
                    self.dom.video = self.$dom.$video[0];
                }
                
                self.sources = sourceParser.convertSources(manifest.sources);
                self.captions = sourceParser.convertCaptions(manifest.captions);
                
                if (self.sources.length > 0) {
                    self.dom.video.src = self.sources[0].src;
                }

                if (self.captions.length > 0) {
                    // $('video')[1].addTextTrack('captions', caption.label, caption.srclang);
                    // addCue
                    // we might be better off adding this to the markup before appending the container
                    self.$dom.$video.append(htmlTemplateGenerator.makeCaptionMarkup(self.captions));
                }
            } else if (self.dom.video.dataset.manifest) {
                // a manifest URL was provided in the DOM
                self.manifestUrl = self.dom.video.dataset.manifest;
                self.sources = sourceManifestParser.getSourcesByManifest(self.dom.video.dataset.manifest);
                self.captions = undefined; // TODO
            } else {
                // use the HTML5 markup
                self.sources = sourceParser.getSources(self);
                self.captions = sourceParser.getCaptions(self); //self.dom.video.textTracks
            }

            cc = self.dom.video.textTracks[0];

            if (cc) {
                cc.mode = 'hidden'; // showing // disabled
            }

            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplateGenerator.makeControlsMarkup(self.sources));
            }
            
            self.$dom.$controls = $videoContainer.children(querySelectors.controls.control_container).first();
            self.dom.controls = self.$dom.$controls[0];
            
            self.buttons = jqButtons.init(self);
            self.progressMeter = jqProgressMeter.init(self);

            $videoContainer.addClass('moviqified');
            
            return self;
        };
    }
});
