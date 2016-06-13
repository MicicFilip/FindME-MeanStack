var express = require('express');
var router = express.Router();


// use session auth to secure the angular app files
// proverava se da li postoji token za sesiju, na ovaj nacin se obezbedjuje sigurnost app fajlova
// bez dodeljenog tokena korisnik ne moze da prodje login/register screen
router.use('/', function (req, res, next) {
    if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }

    next();
});

// make JWT token available to angular app
router.get('/token', function (req, res) {
    res.send(req.session.token);
});

// serve angular app files from the '/app' route
// podesavanje angular rute /app
router.use('/', express.static('app'));

module.exports = router;