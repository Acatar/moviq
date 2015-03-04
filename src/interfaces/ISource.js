/*globals moviqContainer*/
moviqContainer.register({
    name: 'ISource',
    dependencies: ['locale', 'eventHandlers'],
    factory: function (locale, eventHandlers) {
        "use strict";
        
        return function (source) {
            var self = this;
            
            if (!source) {
                eventHandlers.onError(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof source.src !== 'string') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'src');
            }
            
            if (typeof source.type !== 'string') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'type');
            }
            
            if (typeof source.label !== 'string') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'label');
            }

            self.src = source.src;
            self.type = source.type;
            self.label = source.label;
        };
    }
});
