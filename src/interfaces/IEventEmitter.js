/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IEventEmitter',
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this;

            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof implementation.emit !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'emit');
            }

            if (implementation.emit.length !== 2) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'type, data');
            }

            self.emit = implementation.emit;
        };
    }
});
