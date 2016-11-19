angular.module('challenge', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'js/home/homeTmpl.html',
            controller: 'homeCtrl'
        })
        .state('boggle', {
            url: '/boggle',
            templateUrl: 'js/boggle/boggleTmpl.html',
            controller: 'boggleCtrl'
        })
        .state('ticTacToe', {
            url: '/ticTacToe',
            templateUrl: 'js/ticTacToe/ticTacToeTmpl.html',
            controller: 'ticTacToeCtrl'
        })

    $urlRouterProvider
        .otherwise('/');
});