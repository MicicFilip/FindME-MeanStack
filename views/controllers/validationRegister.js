(function () {

var validation = angular.module('validationModule',['ngMessages']);

validation.controller('validationController', function () {

});

validation.directive('capitalizeFirst', function(uppercaseFilter, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if(capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            var model = $parse(attrs.ngModel);
            modelCtrl.$parsers.push(capitalize);
            capitalize(model(scope));
        }
    };
});

var pwdMatch = angular.module('passwordMatchModule', ['ngPassword']);
pwdMatch.controller('passwordMatchController', function (){

});

var ctrlDate = angular.module('ctrlDateModule',[]);

ctrlDate.controller('ctrlDateController', function ($scope) {
    var today = new Date();
    var minAge = 18;
    $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
});

angular.module('validationApp', ['validationModule', 'passwordMatchModule', 'ctrlDateModule']);

})();