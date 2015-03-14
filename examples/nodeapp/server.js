/*jslint node: true*/
var compose,
    start,
    errorCount = 0,
    lastErrorTime;

compose = function (scope) {
    "use strict";
    var url = require('url'),
        path = require('path'),
        fs = require('fs'),
        http = require('http');

    scope.register({
        name: 'http',
        factory: function () {
            return http;
//            var isWin = /^win/.test(process.platform);
//
//            if (isWin) {
//                // take advantage of the httpsys performance enhancements
//                return require('httpsys').http();
//            } else {
//                // otherwise, stick with the standard http module
//                return require('http');
//            }
        }
    });
    
    scope.register({
        name: 'url',
        factory: function () {
            return url;
        }
    });
    
    scope.register({
        name: 'path',
        factory: function () {
            return path;
        }
    });
    
    scope.register({
        name: 'fs',
        factory: function () {
            return fs;
        }
    });
    
    scope.register(require('./www.js'));
};

start = function () {
    "use strict";
    var Hilary = require('hilary'),
        scope = new Hilary();

    compose(scope);
    scope.resolve('www');
};

// This ends up being pretty ugly, like everyone says.
// while we can re-compose without issues, the request that
// was causing us the issues keeps plaguing us after a restart.
process.on('uncaughtException', function (err) {
    "use strict";
    var fiveMinsAgo = new Date(new Date().getTime() - 5 * 60000);
    
    if (!lastErrorTime) {
        lastErrorTime = new Date();
    } else if (fiveMinsAgo.getTime() > lastErrorTime.getTime()) {
        lastErrorTime = null;
        errorCount = 0;
    }
    
    if (errorCount < 10) {
        console.log('restarting: ' + errorCount, err);
        errorCount += 1;

        // we are in a bad running state - re-compose the application.
        start();
    } else {
        // we are struggling to recover from the error.
        // exit the process
        console.log(err);
        process.exit(500);
        return;
    }
});

start();
