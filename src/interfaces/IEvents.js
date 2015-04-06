/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'IEvents',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (eventsImplementation) {
            var self = this,
                ignore = function () {};

            self.onLoadMetadata = eventsImplementation.onLoadMetadata || ignore;
            self.onTimeUpdate = eventsImplementation.onTimeUpdate || ignore;
            self.onCanPlay = eventsImplementation.onCanPlay || ignore;
            self.onCanPlayThrough = eventsImplementation.onCanPlayThrough || ignore;
            self.onVideoEnded = eventsImplementation.onVideoEnded || ignore;
            self.onSeeking = eventsImplementation.onSeeking || ignore;
            self.onSeekComplete = eventsImplementation.onSeekComplete || ignore;
            self.onWaiting = eventsImplementation.onWaiting || ignore;
            self.onError = eventsImplementation.onError || ignore;
            self.onPlay = eventsImplementation.onPlay || ignore;
            self.onPause = eventsImplementation.onPause || ignore;
            self.onShowCaptions = eventsImplementation.onShowCaptions || ignore;
            self.onHideCaptions = eventsImplementation.onHideCaptions || ignore;
            self.onToggleSpeed = eventsImplementation.onToggleSpeed || ignore;
            self.onChangeSpeed = eventsImplementation.onChangeSpeed || ignore;
            self.onToggleQuality = eventsImplementation.onToggleQuality || ignore;
            self.onChangeQuality = eventsImplementation.onChangeQuality || ignore;
            self.onSoundOn = eventsImplementation.onSoundOn || ignore;
            self.onSoundOff = eventsImplementation.onSoundOff || ignore;
            self.onFullscreenOn = eventsImplementation.onFullscreenOn || ignore;
            self.onFullscreenOff = eventsImplementation.onFullscreenOff || ignore;
        };
    }
});
