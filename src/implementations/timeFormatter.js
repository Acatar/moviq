/*globals Hilary, console*/
Hilary.scope('moviqContainer').register({
    name: 'timeFormatter',
    dependencies: ['locale', 'ITimeFormatter'],
    factory: function (locale, ITimeFormatter) {
        "use strict";
        
        var formatTime = function (seconds, useLeadingZero) {
            var m, s;

            m = (useLeadingZero && Math.floor(seconds / 60) < 10) ? '0' + Math.floor(seconds / 60) : Math.floor(seconds / 60);
            s = Math.floor(seconds - (m * 60)) < 10 ? '0' + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));

            return m + ':' + s;
        };
        
        return new ITimeFormatter({
            formatTime: formatTime
        });
    }
});
