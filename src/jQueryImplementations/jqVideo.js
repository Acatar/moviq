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
                scaffold,
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
                scaffold = $('<div>');
                
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
                    // $('video')[1].addTextTrack('captions', caption.label, caption.srclang);
                    // need to addCue from VTT manually
                    // we might be better off adding this to the markup before appending the container
                    // or (warning - hack) we could copy the  HTML and reset the container HTML
                    scaffold.children('video').append(htmlTemplateGenerator.makeCaptionMarkup(self.captions));
                }
                
                // replace the contents of the video container with the generated DOM
                self.$dom.$handle.html(scaffold.html());
                
                self.$dom.$header = self.$dom.$handle.children(querySelectors.header).first();
                self.dom.header = self.$dom.$header[0];
                self.$dom.$video = self.$dom.$handle.children('video').first();
                self.dom.video = self.$dom.$video[0];
                
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
            
            // add a "browser not supported" message if it doesn't already exist
            if (self.$dom.$video.children('.video-not-supported').length < 1) {
                self.$dom.$video.append('<p class="video-not-supported">' + locale.messages.browserNotSupported + '</p>');
            }
            
            cc = self.dom.video.textTracks[0];

            if (cc) {
                cc.mode = 'hidden'; // showing // disabled
            }

            if (existingControls.length < 1) {
                self.$dom.$handle.append(htmlTemplateGenerator.makeControlsMarkup(self.sources, self.captions));
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
