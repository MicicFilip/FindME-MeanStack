(function () {
    'use strict';

    
    // dodati moduli:               ngRoute    pubnub.angular.service   ngNotify
    angular
        .module('app', ['ui.router','ngRoute','pubnub.angular.service', 'ngNotify'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm'
            })
            .state('test', {
                url: '/chat',
                templateUrl: 'chat/index.html',
                controller: 'Test.IndexController',
                controllerAs: 'vm'
            })
            .state('editAccount',{
                url: '/editAccount',
                templateUrl: 'editAccount/index.html',
                controller: 'EditAccount.IndexController',
                controllerAs: 'vm'

            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        // dodavanje JWT tokena u header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        // Na promenu taba se menja stanje trenutno pokrenutog taba
        // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //     $rootScope.activeTab = toState.data.activeTab;
        // });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
            
        });
    });
})();