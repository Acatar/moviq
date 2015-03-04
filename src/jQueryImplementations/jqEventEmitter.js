/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqEventEmitter',
    dependencies: ['locale', 'IEventEmitter', 'jQuery'],
    factory: function (locale, IEventEmitter, $) {
        "use strict";
        
        return new IEventEmitter({
            emit: function (type, data) {
                $(document)
                    .trigger(type, [data])
                    .trigger('moviq-event', [type, data]);
            }
        });
    }
});
