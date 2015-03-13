/*jslint node: true*/
module.exports.name = 'www';
module.exports.dependencies = ['http', 'url', 'path', 'fs'];
module.exports.factory = function (http, url, path, fs) {
    "use strict";
    
    var port = process.env.PORT || 50123,
        mimeTypes = {
            "html": "text/html",
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "js": "text/javascript",
            "css": "text/css"
        };

    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname,
            mimeType = mimeTypes[path.extname(pathname).split(".")[1]],
            filepath = mimeType === 'text/html' ? path.join(process.cwd(), 'views', pathname) : path.join(process.cwd(), 'public', pathname),
            fstream;
        
        fs.exists(filepath, function (exists) {
            if (exists) {
                res.writeHead(200, { 'Content-Type': mimeType });
                fstream = fs.createReadStream(filepath);
                fstream.pipe(res);
            } else {
                res.writeHead(404);
                res.end();
                return;
            }
        });
    }).listen(port);

    console.log('Server running on port, ' + port.toString());

    return http;
};
