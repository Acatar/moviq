/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'ITimeFormatter',
    factory: function (locale) {
        "use strict";
        
        return function (implementation) {
            var self = this,
                impl = implementation || {};
            
            if (!implementation) {
                throw new Error(locale.errors.interfaces.requiresImplementation);
            }
            
            if (typeof impl.formatTime !== 'function') {
                throw new Error(locale.errors.interfaces.requiresProperty + 'formatTime');
            }
            
            if (impl.formatTime.length !== 2) {
                throw new Error(locale.errors.interfaces.requiresArguments + 'ITimeFormatter.formatTime(seconds, useLeadingZero)');
            }

            self.formatTime = impl.formatTime;
        };
    }
});
