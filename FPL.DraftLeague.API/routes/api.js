/**
 * Created by ole.hellenes on 01.10.2015.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('api', {
        title: "API How-To"
    });

});

router.get('/players', function(req, res, next) {

    res.sendfile('././data/mock/players.json');

});

router.get('players/:player_id', function(req, res, next) {

    res.sendfile('././data/mock/player.json');

});

module.exports = router;