/*globals module*/
module.exports = function (grunt) {
    "use strict";
    
    var hilaryFiles = [
            '../src/moviqContainer.js',
            '../src/locales/en_US.js',
            '../src/interfaces/IButtons.js',
            '../src/interfaces/ICaption.js',
            '../src/interfaces/IEventEmitter.js',
            '../src/interfaces/IEvents.js',
            '../src/interfaces/IHtmlTemplateGenerator.js',
            '../src/interfaces/IMoviq.js',
            '../src/interfaces/IProgressMeter.js',
            '../src/interfaces/ISource.js',
            '../src/interfaces/ISourceParser.js',
            '../src/interfaces/ISourceManifestParser.js',
            '../src/interfaces/IVideo.js',
            '../src/interfaces/IVideoInitializer.js',
            '../src/implementations/consoleEventEmitter.js',
            '../src/implementations/defaultEventHandlers.js',
            '../src/implementations/defaultHtmlTemplates.js',
            '../src/implementations/simpleEventEmitter.js',
            '../src/jQueryImplementations/IJqVideo.js',
            '../src/jQueryImplementations/jqButtons.js',
            '../src/jQueryImplementations/jqEventEmitter.js',
            '../src/jQueryImplementations/jqHtmlTemplateGenerator.js',
            '../src/jQueryImplementations/jqProgressMeter.js',
            '../src/jQueryImplementations/jqQuerySelectors.js',
            '../src/jQueryImplementations/jqSourceParser.js',
            '../src/jQueryImplementations/jqVideo.js',
            '../src/jQueryImplementations/jqVideoInitializer.js',
            '../src/models/CoverageReport.js',
            '../src/models/WatchReport.js',
            '../src/moviqBootstrapper.js'
        ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
            Watch the JS and LESS folders for changes. Triggering
            fires off the listed tasks
        **/
        watch: {
            js: {
                files: '../src/**/*.js',
                tasks: ["uglify:debug", "uglify:release"],
                options: { nospawn: true, livereload: true, debounceDelay: 250 }
            }
        },
        /**
            Used for production mode, minify and uglyfy the JavaScript Output
        **/
        uglify: {
            debug: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    beautify: true,
                    mangle: false,
                    compress: false,
                    sourceMap: true,
                    drop_console: false,
                    preserveComments: 'some'
                },
                files: {
                    '../release/moviq.js': hilaryFiles
                }
            },
            release: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//                    mangle: true,
//                    compress: true,
//                    sourceMap: true,
//                    drop_console: true
                },
                files: {
                    '../release/moviq.min.js': hilaryFiles
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};
