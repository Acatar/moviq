/*global moviqContainer*/
moviqContainer.register({
    name: 'jqHtmlTemplateGenerator',
    dependencies: ['locale', 'defaultHtmlTemplates', 'IHtmlTemplateGenerator', 'jqQuerySelectors', 'jQuery'],
    factory: function (locale, htmlTemplates, IHtmlTemplateGenerator, querySelectorsCtor, $) {
        "use strict";
        
        var makeControlsMarkup,
            makeSourceMarkup,
            makeCaptionMarkup;
        
        makeControlsMarkup = function (sources) {
            var $markup,
                $qualityMenu,
                querySelectors = querySelectorsCtor(),
                i;
            
            $markup = $(htmlTemplates.controls);
            $qualityMenu = $markup.find(querySelectors.controls.quality_menu);
            
            for (i = 0; i < sources.length; i += 1) {
                $qualityMenu.append(htmlTemplates.qualityButton.replace(/\{0\}/g, sources[i].label));
            }
            
            return $markup[0];
        };
        
        makeSourceMarkup = function (iSourceArray) {
            var i,
                markup = '';
            
            for (i = 0; i < iSourceArray.length; i += 1) {
                markup += htmlTemplates.sourceElement
                    .replace(/\{type\}/, iSourceArray[i].type)
                    .replace(/\{label\}/, iSourceArray[i].label)
                    .replace(/\{src\}/, iSourceArray[i].src);
            }
            
            return markup;
        };
        
        makeCaptionMarkup = function (iCaptionArray) {
            var i,
                markup = '';
            
            for (i = 0; i < iCaptionArray.length; i += 1) {
                markup += htmlTemplates.sourceElement
                    .replace(/\{label\}/, iCaptionArray[i].label)
                    .replace(/\{srclang\}/, iCaptionArray[i].srclang)
                    .replace(/\{src\}/, iCaptionArray[i].src);
            }
            
            return markup;
        };
        
        return new IHtmlTemplateGenerator({
            makeControlsMarkup: makeControlsMarkup,
            makeSourceMarkup: makeSourceMarkup,
            makeCaptionMarkup: makeCaptionMarkup
        });
        
    }
});
