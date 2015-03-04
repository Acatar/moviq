/*globals moviqContainer*/
moviqContainer.register({
    name: 'jqQuerySelectors',
    factory: {
        header: '.moviq-header',
        controls: {
            control_container: '.moviq-controls',
            more_controls_container: '.moviq-controls-enclosure-more',
            play: '.moviq-btn-play',
            mute: '.moviq-btn-mute',
            fullscreen: '.moviq-btn-fullscreen',
            cc: '.moviq-btn-cc',
            choose_cc: '.moviq-btn-choose-cc',
            speed: '.moviq-btn-speed',
            speed_chooser: '.moviq-speed-chooser',
            speed_current: '.moviq-current-speed',
            choose_speed: '.moviq-btn-choose-speed',
            quality: '.moviq-btn-quality',
            choose_quality: '.moviq-btn-choose-quality',
            progress: '.moviq-progress',
            progress_bar: '.moviq-progress-bar',
            progress_buffer: '.moviq-progress-buffer',
            progress_time: '.moviq-progress-time',
            progress_timeDisplay: '.moviq-progress-display',
            progress_timePicker: '.moviq-progress-picker',
            buttons_right: '.moviq-buttons-right',
            controls_left: '.moviq-controls-left',
            controls_right: '.moviq-controls-right',
            subMenus: ['with-speed', 'with-quality', 'with-cc'],
            getHandle: function (movi, buttonHandle) {
                return movi.$dom.$controls.find(buttonHandle);
            },
            getIconHandle: function (movi, buttonHandle) {
                return movi.$dom.$controls.find(buttonHandle + ' span');
            }
        }
    }
});
