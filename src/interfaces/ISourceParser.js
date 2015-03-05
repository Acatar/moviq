/*globals moviqContainer*/
moviqContainer.register({
    name: 'ISourceParser',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }

            if (typeof impl.getSources !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'getSources');
            }
            
            if (impl.getSources.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iVideo');
            }
            
            if (typeof impl.getCaptions !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'getCaptions');
            }
            
            if (impl.getCaptions.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'iVideo');
            }
            
            if (typeof impl.convertSources !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'convertSources');
            }
            
            if (impl.convertSources.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'sourceArray');
            }
            
            if (typeof impl.convertCaptions !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'convertCaptions');
            }
            
            if (impl.convertCaptions.length !== 1) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'captionArray');
            }
            
            /*!
            // gets the source elements from a video element and converts them to ISource objects
            // @param iVideo (IVideo): the moviq IVideo object to get the sources for
            // @returns an Array of ISource objects
            */
            self.getSources = impl.getSources;
            
            /*!
            // gets the track elements from a video element and converts them to ICaption objects
            // @param iVideo (IVideo): the moviq IVideo object to get the tracks for
            // @returns an Array of ICaption objects
            */
            self.getCaptions = impl.getCaptions;
            
            /*!
            // converts an array of Object Literals into an array of ISource objects, thus
            // enforcing the interface.
            // @param sourceArray (Array): the array of sources to convert
            // @returns an Array of ISource objects
            */
            self.convertSources = impl.convertSources;
            
            /*!
            // converts an array of Object Literals into an array of ICaption objects, thus
            // enforcing the interface.
            // @param captionArray (Array): the array of captions to convert
            // @returns an Array of ICaption objects
            */
            self.convertCaptions = impl.convertCaptions;
        };
    }
});
