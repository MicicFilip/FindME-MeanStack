(function () {
    'use strict';

    angular
        .module('app')
        .controller('Test.IndexController', Controller);

    function Controller(UserService) {

        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            // get trenutnog logovanog korisnika
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }


    }

})();