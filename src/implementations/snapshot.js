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
            dimensions.canvasWidth = movi.dom.video.clientWidth;
            dimensions.canvasHeight = movi.dom.video.clientHeight;
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

//
//		// Get handles on the video and canvas elements
//		var video = document.querySelector('video');
//		var canvas = document.querySelector('canvas');
//		// Get a handle on the 2d context of the canvas element
//		var context = canvas.getContext('2d');
//		// Define some vars required later
//		var w, h, ratio;
//
//		// Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read
//		video.addEventListener('loadedmetadata', function() {
//			// Calculate the ratio of the video's width to height
//			ratio = video.videoWidth / video.videoHeight;
//			// Define the required width as 100 pixels smaller than the actual video's width
//			w = video.videoWidth - 100;
//			// Calculate the height based on the video's width and the ratio
//			h = parseInt(w / ratio, 10);
//			// Set the canvas width and height to the values just calculated
//			canvas.width = w;
//			canvas.height = h;
//		}, false);
//
//		// Takes a snapshot of the video
//		function snap() {
//			// Define the size of the rectangle that will be filled (basically the entire element)
//			context.fillRect(0, 0, w, h);
//			// Grab the image from the video
//			context.drawImage(video, 0, 0, w, h);
//		}
//
//
