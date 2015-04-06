/*globals Hilary, console*/
Hilary.scope('moviqContainer').register({
    name: 'snapshot',
    factory: function (locale, ISnapshot) {
        "use strict";
        
        var grab,
            prepareCanvas;
        
        /*
        // grab a snapshot of the video and render it to the canvas
        */
        grab = function (movi) {
            var canvas = movi.dom.canvas,
                context,
                dimensions;
            
            if (!canvas || !canvas.getContext) {
                // a canvas isn't present or supported, skip the snapshot
                return;
            }
            
            context = canvas.getContext('2d');
            dimensions = prepareCanvas(movi);
            
			// Define the size of the rectangle that will be filled (basically the entire element)
			context.fillRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight);
			
            // Render the image from the video to the canvas
			context.drawImage(movi.dom.video, 0, 0, dimensions.canvasWidth, dimensions.canvasHeight);
        };
        
        /*
        // set the canvas size and get the dimensions of the video
        */
        prepareCanvas = function (movi) {
            var video = movi.dom.video,
                canvas = movi.dom.canvas,
                ratio,
                dimensions = {};
			
            // get the ratio
            ratio = video.videoWidth / video.videoHeight;
            
            // get the dimensions
			dimensions.width = video.videoWidth;
            dimensions.height = parseInt(dimensions.width / ratio, 10); // movi.dom.handle.clientHeight; //video.videoHeight;
            dimensions.canvasWidth = Math.max(1, Math.floor(movi.dom.video.clientWidth)); // a minimum of 1
            dimensions.canvasHeight = Math.max(1, Math.floor(movi.dom.video.clientHeight)); // a minimum of 1
            dimensions.canvasVideoHeight = parseInt(dimensions.canvasWidth / ratio, 10);
            dimensions.dy = dimensions.canvasVideoHeight - dimensions.canvasHeight;

			// Set the canvas width and height to the values just calculated
			canvas.width = dimensions.canvasWidth;
			canvas.height = dimensions.canvasHeight;
            
            return dimensions;
        };
        
        return new ISnapshot({
            grab: grab
        });
    }
});
