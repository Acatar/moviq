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

            if (typeof impl.ify !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'ify');
            }
            
            if (typeof impl.bindAll !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'bindAll');
            }

            self.ify = impl.ify;
            self.bindAll = impl.bindAll;
        };
    }
});
