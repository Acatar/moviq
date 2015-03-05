/*globals moviqContainer*/
moviqContainer.register({
    name: 'ICaption',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (caption) {
            var self = this;
            
            if (!caption) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof caption.src !== 'string') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'src');
            }
            
            if (typeof caption.srclang !== 'string') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'srclang');
            }
            
            if (typeof caption.label !== 'string') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'label');
            }

            self.src = caption.src;
            self.srclang = caption.srclang;
            self.label = caption.label;
        };
    }
});
