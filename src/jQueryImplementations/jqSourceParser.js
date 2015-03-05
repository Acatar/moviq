/*globals moviqContainer, console*/
moviqContainer.register({
    name: 'jqSourceParser',
    dependencies: ['locale', 'ISource', 'ICaption', 'ISourceParser', 'jQuery'],
    factory: function (locale, ISource, ICaption, ISourceParser, $) {
        "use strict";
        
        var getSource,
            getSources,
            getCaption,
            getCaptions,
            convertSources,
            convertCaptions;
        
        getSources = function (movi) {
            var sources = [],
                source = getSource(movi.$dom.$video),
                childSources = movi.$dom.$video.children('source'),
                currentSource,
                i;

            if (source) {
                sources.push(source);
            }

            for (i = 0; i < childSources.length; i += 1) {
                currentSource = getSource($(childSources[i]), i);

                if (currentSource) {
                    sources.push(currentSource);
                }
            }

            return sources;
        };

        getSource = function ($source, count) {
            var src = $source.attr('src'),
                type = $source.attr('type'),
                label = $source.attr('data-label');

            if (src && type) {
                return new ISource({
                    src: src,
                    type: type,
                    label: label || 'Q' + ((count || 0) + 1).toString()
                });
            }

            return null;
        };
        
        getCaptions = function (movi) {
            var captions = [],
                tracks = movi.$dom.$video.children('track'),
                currentCaption,
                i;

            for (i = 0; i < tracks.length; i += 1) {
                currentCaption = getCaption($(tracks[i]), i);

                if (currentCaption) {
                    captions.push(currentCaption);
                }
            }

            return captions;
        };

        getCaption = function ($caption, count) {
            var src = $caption.attr('src'),
                lang = $caption.attr('srclang'),
                label = $caption.attr('label'),
                kind = $caption.attr('kind');

            if (src && lang && kind === 'captions') {
                return new ICaption({
                    src: src,
                    srclang: lang,
                    label: label || 'unknown'
                });
            }

            return null;
        };
        
        convertSources = function (sourceArray) {
            var i,
                sources = [];
            
            for (i = 0; i < sourceArray.length; i += 1) {
                sources.push(new ISource(sourceArray[i]));
            }
            
            return sources;
        };
        
        convertCaptions = function (captionArray) {
            var i,
                captions = [];
            
            for (i = 0; i < captionArray.length; i += 1) {
                captions.push(new ICaption(captionArray[i]));
            }
            
            return captions;
        };
        
        return new ISourceParser({
            getSources: getSources,
            getCaptions: getCaptions,
            convertSources: convertSources,
            convertCaptions: convertCaptions
        });
    }
});
