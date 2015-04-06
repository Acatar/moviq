/*globals Hilary, console*/
Hilary.scope('moviqContainer').register({
    name: 'consoleEventEmitter',
    factory: function (locale, IEventEmitter) {
        "use strict";
        
        return function (movi) {
            return new IEventEmitter({
                emit: function (type, data) {
                    console.log('moviq-event', [type, data]);

                    var dat =  data,
                        watch;
                    
                    delete dat.event;
                    
                    watch = {
                        type: type,
                        data: dat,
                        position: movi.dom.video.currentTime,
                        eventTime: new Date().toISOString()
                    };
                    
                    movi.watchReport.events.push(watch);
                    movi.watchReport.updateCoverageReport();
                }
            });
        };
    }
});
