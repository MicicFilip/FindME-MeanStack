    angular.module('app').directive('messageForm', function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'components/message-form/message-form.html',
        scope: {
            uuid: "@"
        },

        controller: function($scope, currentUser, MessageService){

            $scope.uuid = currentUser;
            $scope.messageContent = '';

           // alert($scope.uuid);

            $scope.sendMessage = function(){
                MessageService.sendMessage($scope.messageContent);
                $scope.messageContent = '';
            }
        }
    };
});