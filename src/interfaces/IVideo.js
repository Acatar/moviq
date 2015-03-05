/*globals moviqContainer*/
moviqContainer.register({
    name: 'IVideo',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation, manifest) {
            var self = this,
                impl = implementation || {};

            self.events = impl.events;
            self.buttons = impl.buttons;
            self.progressMeter = impl.progressMeter;
            self.manifestUrl = impl.manifestUrl;
            self.sources = impl.sources;
            self.captions = impl.captions;
            
            self.dom = {
                handle: impl.dom.handle,
                video: impl.dom.video,
                controls: impl.dom.controls,
                header: impl.dom.header
            };
        };
    }
});
