angular.module('app').directive('userAvatar', function() {
    return {
        restrict: "E",
        template: '<img src="{{avatarUrl}}" alt="{{uuid}}" class="circle">',
        scope: {
            uuid: "@"
            //senderPicture: "@"
        },
        controller: function($scope){
            // Generating a uniq avatar for the given uniq string provided using robohash.org service
            // Vracanje avatara u chatu za korisnika koji kuca svoje poruke
            $scope.avatarUrl = 'data:image/png;base64,' + $scope.uuid;
        }
    };
});
