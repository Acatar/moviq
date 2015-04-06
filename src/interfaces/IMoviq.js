/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IMoviq',
    factory: function (locale, IManifest) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.ify !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'ify');
            }
            
            if (typeof impl.bindAll !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'bindAll');
            }

            self.ify = impl.ify;
            self.bindAll = impl.bindAll;
            self.Manifest = IManifest;
        };
    }
});
