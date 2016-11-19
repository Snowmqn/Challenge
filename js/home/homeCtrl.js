angular.module('challenge')

.controller('homeCtrl', function ($scope, homeService) {
    var getStats = function() {
        var stats = homeService.getStats();
        $scope.pointsHigh = stats.pointsHigh;
        $scope.wordCountHigh = stats.wordCountHigh;
        $scope.wordLong = stats.wordLong;
    }

    getStats();



});