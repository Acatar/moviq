/*globals moviqContainer, console*/
moviqContainer.register({
    name: 'jqSourceParser',
    dependencies: ['locale', 'ISource', 'ISourceParser', 'jQuery'],
    factory: function (locale, Source, ISourceParser, $) {
        "use strict";
        
        var getSource,
            getSources,
            convertSources;
        
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
                return new Source({
                    src: src,
                    type: type,
                    label: label || 'Q' + ((count || 0) + 1).toString()
                });
            }

            return null;
        };
        
        convertSources = function (sourceArray) {
            var i,
                sources = [];
            
            for (i = 0; i < sourceArray.length; i += 1) {
                sources.push(new Source(sourceArray[i]));
            }
            
            return sources;
        };
        
        return new ISourceParser({
            getSources: getSources,
            convertSources: convertSources
        });
    }
});
