/*globals Hilary, console*/
Hilary.scope('moviqContainer').register({
    name: 'simpleEventEmitter',
    dependencies: ['locale', 'IEventEmitter'],
    factory: function (locale, IEventEmitter) {
        "use strict";
        
        return new IEventEmitter({
            emit: function (type, data) {
                console.log('moviq-event', [type, data]);
            }
        });
    }
});
