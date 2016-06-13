﻿var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');



// routes
// rute za API-je
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.get('/',getAllUsers);
router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);

module.exports = router;

// Autentikacija je uspesna ako se ispunjavav uslov za username,password i ako je postoji token za sesiju
function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Funkcija za vracanje svih korisnika iz baze

function getAllUsers(req, res){
    userService.getUsers().then(function (user) {
        if (user) {
            
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
// Funkicija koja vraca informacije o trenutnom korisniku

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

// Funkcija koja ne dozvoljava korisniku da promeni tudje profile

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//
// function deleteUser(req, res) {
//     var userId = req.user.sub;
//     if (req.params._id !== userId) {
//         // can only delete own account
//         return res.status(401).send('You can only delete your own account');
//     }
//
//     userService.delete(userId)
//         .then(function () {
//             res.sendStatus(200);
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }