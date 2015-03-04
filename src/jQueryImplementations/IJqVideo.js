/*globals moviqContainer*/
moviqContainer.register({
    name: 'IJqVideo',
    dependencies: ['locale', 'IVideo'],
    factory: function (locale, IVideo) {
        "use strict";
        
        return function (implementation, manifest) {
            var self = new IVideo(implementation),
                impl = implementation || {};
            
            self.$dom = {
                $handle: impl.$dom.$handle,
                $video: impl.$dom.$video,
                $controls: impl.$dom.$controls,
                $header: impl.$dom.$header
            };

            return self;
        };
    }
});
