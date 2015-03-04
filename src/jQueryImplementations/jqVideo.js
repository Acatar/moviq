/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqVideo',
    dependencies: ['locale', 'IJqVideo', 'jqQuerySelectors', 'eventHandlers', 'jqButtons', 'jqProgressMeter', 'sourceParser', 'sourceManifestParser', 'htmlTemplates'],
    factory: function (locale, IJqVideo, querySelectors, eventHandlers, jqButtons, jqProgressMeter, sourceParser, sourceManifestParser, htmlTemplates) {
        "use strict";
        
        return function ($videoContainer) {
            var self,
                existingControls = $videoContainer.find(querySelectors.controls.control_container),
                cc,
                btns,
                prog;
            
            self = new IJqVideo({
                events: eventHandlers,
                $dom: {
                    $handle: $videoContainer,
                    $video: $videoContainer.children('video').first(),
                    $controls: $videoContainer.children(querySelectors.controls.control_container).first(),
                    $header: $videoContainer.children(querySelectors.header).first()
                },
                dom: {
                    handle: $videoContainer[0],
                    video: $videoContainer.children('video').first()[0],
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
                cc.mode = 'hidden';
            }

            $videoContainer.addClass('moviqified');
        };
    }
});
