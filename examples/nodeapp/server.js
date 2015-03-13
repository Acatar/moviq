/*jslint node: true*/
var Hilary = require('hilary'),
    scope = new Hilary(),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    compose,
    start;

compose = function (scope) {
    "use strict";

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

    compose(scope);
    scope.resolve('www');
};

start();
