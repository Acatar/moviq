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
            
            if (impl.makeControlsMarkup.length !== 2) {
                eventHandlers.onError(locale.errors.interfaces.requiresArguments + 'sources, captions');
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
            
            if (typeof impl.makeHeaderMarkup !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'makeHeaderMarkup');
            }
            
            if (impl.makeHeaderMarkup.length !== 1) {
                eventHandlers.onError(locale.errors.interfaces.requiresArguments + 'header');
            }
            
            if (typeof impl.makeVideoMarkup !== 'function') {
                eventHandlers.onError(locale.errors.interfaces.requiresProperty + 'makeVideoMarkup');
            }
            
            if (impl.makeVideoMarkup.length !== 1) {
                eventHandlers.onError(locale.errors.interfaces.requiresArguments + 'poster');
            }

            self.makeControlsMarkup = impl.makeControlsMarkup;
            self.makeSourceMarkup = impl.makeSourceMarkup;
            self.makeCaptionMarkup = impl.makeCaptionMarkup;
            self.makeHeaderMarkup = impl.makeHeaderMarkup;
            self.makeVideoMarkup = impl.makeVideoMarkup;
        };
    }
});
