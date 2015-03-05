/*globals moviqContainer, console*/
moviqContainer.register({
    name: 'jqVideoInitializer',
    dependencies: ['locale', 'Video', 'IVideoInitializer', 'jQuery'],
    factory: function (locale, Video, IVideoInitializer, $) {
        "use strict";
        
        return new IVideoInitializer({
            bindVideos: function (jqSelector, manifest) {
                var videos,
                    result = [],
                    video,
                    i,
                    moviqified = '.moviqified';

                if (!jqSelector) {
                    videos = $('.moviq-video').not(moviqified);
                } else if (typeof jqSelector === 'string') {
                    videos = $(jqSelector).not(moviqified);
                } else if (jqSelector instanceof $) {
                    videos = jqSelector.not(moviqified);
                }

                if (videos.length === 0) {
                    console.log('moviq info', 'no videos were found to process');
                }

                for (i = 0; i < videos.length; i += 1) {
                    result.push(new Video($(videos[i]), manifest));
                }

                return result;
            }
        });
    }
});
