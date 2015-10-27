/**
 * Created by ole.hellenes on 01.10.2015.
 */

var express = require('express');
var fplApi = require('../services/fplApi');
var router = express.Router();

router.get('/', function (req, res, next) {

  res.render('api', {
    title: "API How-To"
  });

});

router.get('/players', function (req, res, next) {

  //res.sendfile('././data/mock/players.json');
  fplApi.getPlayers()

    .then(function (result) {
      res.send(result);
    });

  //res.sendfile(JSON.stringify(players));

  //res.send(players);

});

router.get('/players/:player_id', function (req, res, next) {

  fplApi.getPlayer(req.params.player_id)
    .then(function(data) {
      res.send(data);
    });

});

module.exports = router;
