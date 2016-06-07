angular.module('app').service('currentUser', function (UserService) {
    var vm = this;
    vm.user = null;

    initController();

    function initController() {
        
        // get trenutnog user-a
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }
});







