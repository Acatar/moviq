/*globals moviqContainer*/
moviqContainer.register({
    name: 'IHtmlTemplateGenerator',
    dependencies: ['locale', 'eventHandlers'],
    factory: function (locale, eventHandlers) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                eventHandlers.onError(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.makeControlsMarkup !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'makeControlsMarkup');
            }
            
            if (impl.makeControlsMarkup.length !== 1) {
                eventHandlers.onError(locale.errors.interfaces.requiresArguments + 'videoContainer');
            }
            
            if (typeof impl.makeSourceMarkup !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'makeSourceMarkup');
            }
            
            if (impl.makeSourceMarkup.length !== 1) {
                eventHandlers.onError(locale.errors.interfaces.requiresArguments + 'iSourceArray');
            }
            
            if (typeof impl.makeCaptionMarkup !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'makeCaptionMarkup');
            }
            
            if (impl.makeCaptionMarkup.length !== 1) {
                eventHandlers.onError(locale.errors.interfaces.requiresArguments + 'iCaptionArray');
            }

            self.makeControlsMarkup = impl.makeControlsMarkup;
            self.makeSourceMarkup = impl.makeSourceMarkup;
            self.makeCaptionMarkup = impl.makeCaptionMarkup;
        };
    }
});
