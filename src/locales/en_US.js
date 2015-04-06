/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'locale::en_US',
    factory: {
        errors: {
            interfaces: {
                requiresImplementation: 'An implementation is required to create a new instance of an interface',
                requiresProperty: 'The implementation is missing a required property: ',
                requiresArguments: 'The implementation of this function requires the arguments: '
            },
            jqButtons: {
                fullscreenNotSupported: 'Sorry, we don\'t recognize your browser, so we can\'t toggle fullscreen mode.'
            }
        },
        messages: {
            browserNotSupported: 'Sorry, a browser that supports HTML5 video playback is required to view this content.'
        }
    }
});
