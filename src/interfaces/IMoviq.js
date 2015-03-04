/*globals moviqContainer*/
moviqContainer.register({
    name: 'IMoviq',
    dependencies: ['locale', 'eventHandlers'],
    factory: function (locale, eventHandlers) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                eventHandlers.onError(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.bindTo !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'bindTo');
            }
            
            if (typeof impl.bindAll !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'bindAll');
            }

            self.bindTo = impl.bindTo;
            self.bindAll = impl.bindAll;
        };
    }
});
