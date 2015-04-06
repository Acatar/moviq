/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IProgressMeter',
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};

            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.init !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'init');
            }
            
            if (implementation.init.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iVideo');
            }
            
            self.init = impl.init;
        };
    }
});
