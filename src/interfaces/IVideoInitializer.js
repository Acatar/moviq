/*globals moviqContainer*/
moviqContainer.register({
    name: 'IVideoInitializer',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            
            if (typeof impl.bindVideos !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'bindVideos');
            }
            
            if (impl.bindVideos.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'querySelector');
            }

            self.bindVideos = impl.bindVideos;
        };
    }
});
