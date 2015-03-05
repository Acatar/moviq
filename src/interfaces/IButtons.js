/*globals moviqContainer*/
moviqContainer.register({
    name: 'IButtons',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};

            self.togglePlay = impl.togglePlay;
            self.toggleFullscreen = impl.toggleFullscreen;
            self.toggleCaptions = impl.toggleCaptions;
            self.toggleMute = impl.toggleMute;
            self.toggleQuality = impl.toggleQuality;
            self.changeQuality = impl.changeQuality;
            self.toggleSpeed = impl.toggleSpeed;
            self.changeSpeed = impl.changeSpeed;
        };
    }
});
