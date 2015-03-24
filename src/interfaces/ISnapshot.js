/*globals moviqContainer*/
moviqContainer.register({
    name: 'ISnapshot',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            
            if (typeof impl.grab !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'grab');
            }
            
            if (impl.grab.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iVideo');
            }

            self.grab = impl.grab;
        };
    }
});
