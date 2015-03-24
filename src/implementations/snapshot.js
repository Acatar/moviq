/*globals moviqContainer, console*/
moviqContainer.register({
    name: 'snapshot',
    dependencies: ['locale', 'ISnapshot'],
    factory: function (locale, ISnapshot) {
        "use strict";
        
        var grab,
            prepareCanvas;
        
        /*
        // grab a snapshot of the video and render it to the canvas
        */
        grab = function (movi) {
            var video = movi.dom.video,
                canvas = movi.dom.canvas,
                context,
                dimensions;
            
            if (!canvas || !canvas.getContext) {
                // a canvas isn't present or supported, skip the snapshot
                return;
            }
            
            context = canvas.getContext('2d');
            dimensions = prepareCanvas(movi);
            
			// Define the size of the rectangle that will be filled (basically the entire element)
			context.fillRect(0, 0, dimensions.width, dimensions.height);
			
            // Render the image from the video to the canvas
			context.drawImage(video, 0, 0, dimensions.width, dimensions.height);
        };
        
        /*
        // set the canvas size and get the dimensions of the video
        */
        prepareCanvas = function (movi) {
            var video = movi.dom.video,
                canvas = movi.dom.canvas,
                dimensions = {};
			
            // get the dimensions
			dimensions.width = movi.dom.handle.clientWidth; //video.videoWidth;
            dimensions.height = movi.dom.handle.clientHeight; //video.videoHeight;

			// Set the canvas width and height to the values just calculated
			canvas.width = dimensions.width;
			canvas.height = dimensions.height;
            
            return dimensions;
        };
        
        return new ISnapshot({
            grab: grab
        });
    }
});
