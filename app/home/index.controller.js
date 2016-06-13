(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller($scope, UserService) {
        
        var vm = this;

        vm.user = null;

        initController();

        // URL API-ja se hvata iz GetAll() funkcije koja se nalazi u app-services/user.service
        function initController() {
            UserService.GetAll().then(function (data) {
                $scope.user = data;
            });
        }

    }

})();