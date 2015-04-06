/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IVideo',
    factory: function (locale) {
        "use strict";
        
        return function (implementation, manifest) {
            var self = this,
                impl = implementation || {};

            self.events = impl.events;
            self.sources = impl.sources;
            self.captions = impl.captions;
            self.buttons = impl.buttons;
            self.progressMeter = impl.progressMeter;
            self.manifestUrl = impl.manifestUrl;
            self.watchReport = impl.watchReport;
            self.duration = impl.duration;
            
            self.dom = {
                handle: impl.dom.handle,
                video: impl.dom.video,
                controls: impl.dom.controls,
                header: impl.dom.header
            };
        };
    }
});
