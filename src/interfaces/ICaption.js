/*globals moviqContainer*/
moviqContainer.register({
    name: 'ICaption',
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
            
            if (typeof source.srclang !== 'string') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'srclang');
            }
            
            if (typeof source.label !== 'string') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'label');
            }

            self.src = source.src;
            self.srclang = source.srclang;
            self.label = source.label;
        };
    }
});
