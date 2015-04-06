/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IHtmlTemplateGenerator',
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.makeControlsMarkup !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'makeControlsMarkup');
            }
            
            if (impl.makeControlsMarkup.length !== 2) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'sources, captions');
            }
            
            if (typeof impl.makeSourceMarkup !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'makeSourceMarkup');
            }
            
            if (impl.makeSourceMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iSourceArray');
            }
            
            if (typeof impl.makeCaptionMarkup !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'makeCaptionMarkup');
            }
            
            if (impl.makeCaptionMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iCaptionArray');
            }
            
            if (typeof impl.makeHeaderMarkup !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'makeHeaderMarkup');
            }
            
            if (impl.makeHeaderMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'header');
            }
            
            if (typeof impl.makeSnapshotMarkup !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'makeSnapshotMarkup');
            }
            
            if (typeof impl.makeVideoMarkup !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'makeVideoMarkup');
            }
            
            if (impl.makeVideoMarkup.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'poster');
            }

            self.makeControlsMarkup = impl.makeControlsMarkup;
            self.makeSourceMarkup = impl.makeSourceMarkup;
            self.makeCaptionMarkup = impl.makeCaptionMarkup;
            self.makeHeaderMarkup = impl.makeHeaderMarkup;
            self.makeSnapshotMarkup = impl.makeSnapshotMarkup;
            self.makeVideoMarkup = impl.makeVideoMarkup;
        };
    }
});
