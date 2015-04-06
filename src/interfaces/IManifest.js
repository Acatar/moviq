/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IManifest',
    factory: function (locale) {
        "use strict";
        
        return function (manifest) {
            var self = this,
                impl = manifest || {};

            self.poster = impl.poster;
            self.header = impl.header;
            self.preload = impl.preload;
            self.sources = impl.sources instanceof Array ? impl.sources : [];
            self.captions = impl.captions instanceof Array ? impl.captions : [];
        };
    }
});
