/*globals moviqContainer*/
moviqContainer.register({
    name: 'CoverageReport',
    dependencies: ['locale'],
    factory: function (locale) {
        "use strict";
        
        return function (data) {
            var self = this,
                dat = data || {};

            self.timeRanges = dat.timeRanges;
            self.duration = dat.duration;
            self.durationConsumed = dat.durationConsumed;
            self.coverageAsPercent = dat.coverageAsPercent;
            self.roundedCoverageAsPercent = Math.round(dat.coverageAsPercent);
        };
    }
});
