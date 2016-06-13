(function () {
angular
    .module('app')
    .run(['Pubnub','currentUser', function(Pubnub, currentUser) {

        Pubnub.init({
            publish_key: 'pub-c-e82aa1ff-6b87-4d59-bae0-d231431ee808',
            subscribe_key: 'sub-c-afdc2414-2c22-11e6-84f2-02ee2ddab7fe',
            uuid: currentUser,
            origin: 'pubsub.pubnub.com',
            ssl: true
        });

    }])

    .run(['ngNotify', function(ngNotify) {

        ngNotify.config({
            theme: 'paster',
            position: 'top',
            duration: 250
        });

    }]);
})();
