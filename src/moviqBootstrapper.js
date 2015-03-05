/*global moviqContainer, console*/

/*!
// The composition root. This is where we choose the implementations that will
// make up this instance of Moviq.
*/
(function (exports) {
    "use strict";
    
    var compose;
    
    /*!
    // The compose function does the work of choosing implementations, creating singletons,
    // and registering these decisions to be used by other modules.
    */
    compose = function (scope) {
        var locale,
            sourceParser,
            sourceManifestParser,
            htmlTemplateGenerator,
            Video,
            videoInitializer;
        
        /*!
        // Most of what we are trying to accomplish here, is to create singletons for instances that
        // can be re-used during the application lifecycle. We use a lazy-loading pattern here, resolving
        // the dependencies at the last minute, to avoid needing to keep these registrations in a certain order.
        */
        
        scope.register({
            name: 'locale',
            factory: function () {
                if (!locale) {
                    locale = scope.resolve('locale::en_US');
                }
                
                return locale;
            }
        });
        
//        scope.register({
//            name: 'eventEmitter',
//            factory: function () {
//                if (!eventEmitter) {
//                    eventEmitter = scope.resolve('jqEventEmitter');
//                }
//
//                return eventEmitter;
//            }
//        });
        
//        scope.register({
//            name: 'eventHandlers',
//            factory: function () {
//                if (!eventHandlers) {
//                    eventHandlers = scope.resolve('defaultEventHandlers');
//                }
//
//                return eventHandlers;
//            }
//        });
        
        scope.register({
            name: 'sourceParser',
            factory: function () {
                if (!sourceParser) {
                    sourceParser = scope.resolve('jqSourceParser');
                }
                
                return sourceParser;
            }
        });
        
        scope.register({
            name: 'sourceManifestParser',
            factory: function () {
                if (!sourceManifestParser) {
                    sourceManifestParser = "NOT IMPLEMENTED";
                    //sourceManifestParser = scope.resolve('jqSourceManifestParser');
                }
                
                return sourceManifestParser;
            }
        });
        
        scope.register({
            name: 'htmlTemplateGenerator',
            factory: function () {
                if (!htmlTemplateGenerator) {
                    htmlTemplateGenerator = scope.resolve('jqHtmlTemplateGenerator');
                }
                
                return htmlTemplateGenerator;
            }
        });
        
        scope.register({
            name: 'Video',
            factory: function () {
                if (!Video) {
                    Video = scope.resolve('jqVideo');
                }
                
                return Video;
            }
        });
        
        scope.register({
            name: 'videoInitializer',
            factory: function () {
                if (!videoInitializer) {
                    videoInitializer = scope.resolve('jqVideoInitializer');
                }
                
                return videoInitializer;
            }
        });
    };
    
    exports.Moviq = function (options) {
        var scope = moviqContainer,
            opts = options || {},
            Moviq,
            initializer,
            output;
        
        compose(scope);
        Moviq = scope.resolve('IMoviq');
        initializer = scope.resolve('videoInitializer');

        //! Create an instance of IMoviq to return as the result
        output = new Moviq({
            ify: initializer.bindVideos,
            bindAll: initializer.bindVideos
        });
        
        if (opts.bindNow) {
            output.bindAll();
        }
        
        return output;
    };
    
}(window));
