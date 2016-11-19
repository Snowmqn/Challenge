angular.module('challenge')

.service('homeService', function () {

    stats = {
        pointsHigh: null,
        wordCountHigh: null,
        wordLong: null
    }

    var setStats = function(points, wordCount, wordLong) {
        stats.pointsHigh = points;
        stats.wordCountHigh = wordCount;
        stats.wordLong = wordLong;
    }

    var initialize = function() {
        if (localStorage['points']) {
            setStats(localStorage['points'], localStorage['wordCount'], localStorage['wordLong']);
        }
    }()

    this.getStats = function() {
        return stats;
    }

    

    this.updateStats = function(points, wordCount, wordLong) {
        if (localStorage['points'] == undefined) {
            localStorage['points'] = points;
            localStorage['wordCount'] = wordCount;
            localStorage['wordLong'] = wordLong;
            setStats(points, wordCount, wordLong);
            return;
        }

        if (localStorage['points'] < points) {
            localStorage['points'] = points;
        }

        if (localStorage['wordCount'] < wordCount) {
            localStorage['wordCount'] = wordCount;
        }
        if (localStorage['wordLong'].length < wordLong.length) {
            localStorage['wordLong'] = wordLong;
        }

        setStats(localStorage['points'], localStorage['wordCount'], localStorage['wordLong']);
    }

//     var foo = localStorage.getItem("bar");
// // ...
// localStorage.setItem("bar", foo);
});