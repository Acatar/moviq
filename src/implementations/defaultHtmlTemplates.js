/*globals Hilary*/
Hilary.scope('moviqContainer').register({
    name: 'defaultHtmlTemplates',
    factory: function (locale) {
        "use strict";
        
        var controls,
            qualityButton,
            ccButton,
            sourceElement,
            trackElement,
            header,
            canvas,
            poster,
            video,
            videoWithPoster;
        
        controls =
            '<div class="moviq-controls">'
                + '<div class="moviq-controls-enclosure-more moviq-controls-quality">'

                + '</div>'
                + '<div class="moviq-controls-enclosure-more moviq-controls-speed">'
                    + '<output class=" moviq-btn-text moviq-current-speed">1x</output>'
                    + '<input class="moviq-speed-chooser" type="range" min=".25" max="3" step=".25" value="1" aria-label="Choose a playback speed" />'
                + '</div>'
                + '<div class="moviq-controls-enclosure-more moviq-controls-cc">'

                + '</div>'
                + '<div class="moviq-controls-enclosure">'
                    + '<div class="moviq-controls-left">'
                        + '<button class="moviq-btn moviq-btn-play" aria-label="Play or pause the video">'
                            + '<span class="fa fa-play"></span>'
                        + '</button>'
                    + '</div>'
                    + '<div class="moviq-progress">'
                        + '<span class="moviq-progress-display"></span>'
                        + '<span class="moviq-progress-picker"></span>'
                        + '<div class="moviq-progress-bar" aria-label="This bar shows the current position of the video, as well as the amount buffered. You can click anywhere in this bar to seek to a new position.">'
                            + '<span class="moviq-progress-buffer"></span>'
                            + '<span class="moviq-progress-time"></span>'
                        + '</div>'
                    + '</div>'
                    + '<div class="moviq-controls-right">'
                        + '<button class="moviq-btn moviq-btn-cc" aria-label="Toggle closed captions. This will open a menu, if more than one text track is available.">'
                            + '<i class="fa fa-cc"></i>'
                        + '</button>'
                        + '<button class="moviq-btn moviq-btn-speed moviq-btn-submenu" aria-label="Toggle the controls for choosing a playback speed">'
                            + '<i class="fa fa-clock-o"></i>'
                        + '</button>'
                        + '<button class="moviq-btn moviq-btn-quality moviq-btn-submenu moviq-btn-text" aria-label="Toggle the video quality options">'
                            + '<em>HD</em>'
                        + '</button>'
                        + '<button class="moviq-btn moviq-btn-mute" aria-label="Mute or unmute sound">'
                            + '<span class="fa fa-volume-off"></span>'
                        + '</button>'
                        + '<button class="moviq-btn moviq-btn-fullscreen" aria-label="Toggle fullscreen">'
                            + '<span class="fa fa-arrows-alt"></span>'
                        + '</button>'
                    + '</div>'
                + '</div>'
            + '</div>';
        
        qualityButton =
                    '<button class="moviq-btn moviq-btn-choose-quality moviq-btn-text" aria-label="Set the video quality to: {0}" data-quality="{0}">'
                        + '<em>{0}</em>'
                    + '</button>';
        
        ccButton =
                    '<button class="moviq-btn moviq-btn-choose-cc moviq-btn-text" aria-label="Set the closed captions to: {lang}" data-lang="{lang}" data-id="{id}">'
                        + '<em>{lang}</em>'
                    + '</button>';
        
        sourceElement = '<source type="{type}" data-label="{label}" src="{src}" />';
        trackElement = '<track label="{label}" kind="captions" srclang="{srclang}" src="{src}" data-id="{id}">';
        header = '<div class="moviq-header">{header}</div>';
        canvas = '<canvas class="moviq-snapshot moviq-hidden"></canvas>';
        poster = '<div class="moviq-poster" style="background-image: url({poster});"></div>';
        
        video =
            '<video>'
                + '<p class="video-not-supported">' + locale.messages.browserNotSupported + '</p>'
            + '</video>';
        
        videoWithPoster =
            '<video poster="{poster}">'
                + '<p class="video-not-supported">' + locale.messages.browserNotSupported + '</p>'
            + '</video>';
        
        return {
            controls: controls,
            qualityButton: qualityButton,
            ccButton: ccButton,
            sourceElement: sourceElement,
            trackElement: trackElement,
            header: header,
            canvas: canvas,
            poster: poster,
            video: video,
            videoWithPoster: videoWithPoster
        };
    }
});
