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
            "css": "text/css",
            "vtt": "text/vtt"
        };

    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname,
            mimeType,
            filepath,
            fstream;

        if (pathname === '/') {
            res.writeHead(200, { 'Content-Type': mimeTypes["html"] });
            fstream = fs.createReadStream(path.join(process.cwd(), 'views', 'index.html'));
            fstream.pipe(res);
            return;
        }
        
        mimeType = mimeTypes[path.extname(pathname).split(".")[1]];
        filepath = mimeType === 'text/html' ? path.join(process.cwd(), 'views', pathname) : path.join(process.cwd(), 'public', pathname);
        
        fs.exists(filepath, function (exists) {
            if (exists) {
                res.writeHead(200, { 'Content-Type': mimeType });
                fstream = fs.createReadStream(filepath);
                fstream.pipe(res);
                return;
            } else {
                res.writeHead(404);
                //res.write(filepath);
                res.end();
                return;
            }
        });
    }).listen(port);

    console.log('Server running on port, ' + port.toString());

    return http;
};
