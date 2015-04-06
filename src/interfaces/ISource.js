/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'ISource',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (source) {
            var self = this;
            
            if (!source) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof source.src !== 'string') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'src');
            }
            
            if (typeof source.type !== 'string') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'type');
            }
            
            if (typeof source.label !== 'string') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'label');
            }

            self.src = source.src;
            self.type = source.type;
            self.label = source.label;
        };
    }
});
