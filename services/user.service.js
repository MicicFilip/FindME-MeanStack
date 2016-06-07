var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');


var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.getUsers = getUsers;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication uspela
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication nije uspela
            deferred.resolve();
        }
    });

    return deferred.promise;
}

// funkcija za vracanje svih usera u array
function getUsers(){
    var deferred = Q.defer();
    db.users.find().toArray(function (err, user) {
        if(user){
            //console.log(user);
            deferred.resolve(_.omit(user));
        }else{
            deferred.reject(err);
        }

    });
    return deferred.promise;
}
function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // vraca user-a (bez hashed password)
            deferred.resolve(_.omit(user, 'hash'));

        } else {
            // user nije pronadjen
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation pri registrovanju
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password', 'confirmPassword');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);




        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user.username !== userParam.username) {
            // promena username-a i provera da li on postoji
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err);

                    if (user) {
                        // Username postoji
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        // Ovo je povezano sa register.controllerom
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
            bio: userParam.bio,
            gender: userParam.gender,
            photoID: userParam.photoID

        };

        // Update password-a ako je unet isti
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }



        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
