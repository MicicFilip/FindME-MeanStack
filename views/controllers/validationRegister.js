(function () {

    // Modul koji omogucava da se prikazu error poruke
var validation = angular.module('validationModule',['ngMessages']);

validation.controller('validationController', function () {

});

    // Modul za kapitalizaciju prvog pocetnog slova za ime i prezime
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
    // Modul koji uporedjuje dva input field-a za proveru passworda
var pwdMatch = angular.module('passwordMatchModule', ['ngPassword']);
pwdMatch.controller('passwordMatchController', function (){

});

    // Modul za datum rodjenja korisnika koji daje restrikciju registrovanja u slucaju da korisnik ima ispod 18 godina
var ctrlDate = angular.module('ctrlDateModule',[]);

ctrlDate.controller('ctrlDateController', function ($scope) {
    var today = new Date();
    var minAge = 18;
    $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
});

    // Spajanje svih angular modula u jedan veliki modul
angular.module('validationApp', ['validationModule', 'passwordMatchModule', 'ctrlDateModule']);

})();