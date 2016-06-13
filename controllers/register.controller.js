var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    // registracija putem API-ja da bi se odrzala cistoca medju slojevima
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }
    // U ovom if-u dodati atribute za tabelu u MDB iako se ne nalaze u registraciji
        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                bio: req.body.bio,
                gender: req.body.gender,
                photoID: req.body.photoID

            });
        }

        // return to login page with success message
        // vracanje poruke za uspesnu registraciju
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;