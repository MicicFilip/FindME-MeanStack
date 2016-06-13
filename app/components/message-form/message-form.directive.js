    angular.module('app').directive('messageForm', function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'components/message-form/message-form.html',
        scope: {
            uuid: "@"
        },

        controller: function($scope, currentUser, MessageService){
            // Pozivanje trenutnog korisnika kroz Scope
            $scope.uuid = currentUser;
            // Scope gde ce korisnik ispuniti String svojom porukom koju zeli da posalje
            $scope.messageContent = '';


            // Scope funkcije koja se poziva iz fajla Message Factory, ova funkcija prosledjuje poruku na message-list-u
            $scope.sendMessage = function(){
                MessageService.sendMessage($scope.messageContent);
                $scope.messageContent = '';
            }
        }
    };
});