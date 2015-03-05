/*globals moviqContainer*/
moviqContainer.register({
    name: 'WatchReport',
    dependencies: ['locale', 'CoverageReport'],
    factory: function (locale, CoverageReport) {
        "use strict";
        
        return function (movi) {
            var self = this,
                videoElement = movi.dom.video;

            self.events = [];
            self.coverageReport = undefined;
            self.updateCoverageReport = function () {
                var i,
                    timeRange,
                    timeRanges = [],
                    durationConsumed = 0,
                    coverage = 0,
                    veTimeRanges = videoElement.played || {},
                    duration = videoElement.duration;

                for (i = 0; i < veTimeRanges.length; i += 1) {
                    timeRange = {
                        start: veTimeRanges.start(i),
                        end: veTimeRanges.end(i)
                    };

                    timeRanges.push(timeRange);
                    durationConsumed += timeRange.end - timeRange.start;
                }

                coverage = (durationConsumed * 100) / duration;

                self.coverageReport = new CoverageReport({
                    timeRanges: timeRanges,
                    duration: duration,
                    durationConsumed: durationConsumed,
                    coverage: coverage
                });
                
                return self.coverageReport;
            };
        };
    }
});
