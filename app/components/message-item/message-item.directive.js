angular.module('app').directive('messageItem', function(MessageService) {
    return {
        restrict: "E",
        templateUrl: 'components/message-item/message-item.html',
        scope: {

            // Pozivanje varijabli iz Message factory fajla
            senderUuid: "@",
            senderPicture: "@",
            content: "@",
            date: "@"
        }
    };

});