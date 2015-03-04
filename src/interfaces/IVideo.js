/*globals moviqContainer*/
moviqContainer.register({
    name: 'IVideo',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};

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
