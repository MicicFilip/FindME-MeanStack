(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($scope, UserService) {
        
        var vm = this;

        vm.user = null;

        initController();

        // URL API-ja se hvata iz GetAll() funkcije koja se nalazi u user.service
        function initController() {
            UserService.GetAll().then(function (data) {
                $scope.user = data;
            });
        }
        /*var vm = this;

        vm.user = null;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }*/
    }

})();