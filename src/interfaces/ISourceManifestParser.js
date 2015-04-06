/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'ISourceManifestParser',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.getSourcesByManifest !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'getSourcesByManifest');
            }
            
            if (impl.getSourcesByManifest.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iVideo');
            }
            
            self.getSourcesByManifest = impl.getSourcesByManifest;
        };
    }
});
