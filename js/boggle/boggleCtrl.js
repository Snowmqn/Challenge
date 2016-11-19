angular.module('challenge')

.controller('boggleCtrl', function ($scope, boggleService, homeService) {
    $scope.points = 'None, because this has not been done';
    $scope.wordCount = 'None, not done yet';
    $scope.words = ['none','yet'];

    $scope.runBoggle = function() {
        var result = {};
        result = boggleService.runBoggle();
        $scope.points    = result.points;
        $scope.wordCount = result.wordCount;
        $scope.words     = result.words;

        for (let i=0;i<16;i++) addLetter(i, result.letters[i]);

        var longWord = '';
        for (let i=0;i<result.words.length;i++) {
            if (longWord.length < result.words[i].length) {
                longWord = result.words[i];
            }
        }

        homeService.updateStats(result.points, result.wordCount, longWord);
    };

    var addLetter = function(id, letter) {
        var c = document.getElementById(id);
        var ctx = c.getContext("2d");
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = '#000';
        ctx.font = '60px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(letter, c.width / 2, (c.height / 2) + 25);
    }
});