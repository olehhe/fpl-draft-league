/**
 * Created by Hellenes on 25/10/15.
 */

var request = require('request');
var async = require('async');
var Q = require('q');
var esjson = require('../components/elasticateJson');

var fplApi = {};
var apiUrl = "http://fantasy.premierleague.com/web/api/elements/";

fplApi.getPlayers = function () {

  var deferred = Q.defer();
  var maxPlayers = 30; // Subject to change

  function getPlayer(endpoint){
    return function (cb) {
      request(endpoint, function (error, response, body) {

        if (error || response.statusCode != 200)
          return cb(response);

        cb(null, JSON.parse(body));
      });
    /*
     return function(cb) {
        fplApi.getPlayer(playerId)
          .then(function(player) {
            cb(null, player);
          })
          .error(function(err) {
            return cb(err);
          });
      }
     */
    }
  }

  var allPlayers = []; // Temp storage before feeding to ElasticSearch

  var queue = [];
  for (var i = 1; i <= maxPlayers; i++) {

    var endpoint = apiUrl + i;
    queue.push(getPlayer(endpoint));
  }

  var limit = 4;
  async.parallelLimit(queue, limit, function (err, data) {
    if (err) {
      console.error("Shit happened:: ", err);
      deferred.reject(err);
      return;
    }

    allPlayers = data;
    allPlayers.map(function(player) {
      return esjson.elasticate(player);
    });

    deferred.resolve(allPlayers);
  });

  return deferred.promise;

};

fplApi.getPlayer = function(playerId) {

  var deferred = Q.defer();

  if (!playerId) {
    return Q.reject("WTF U DOIN?");
  }

  var endpoint = apiUrl + playerId;
  request(endpoint, function(error, response, body) {

    if (error || response.statusCode != 200)
       return deferred.reject(response);

    deferred.resolve(esjson.elasticate(JSON.parse(body)));
  });

  return deferred.promise;

}

module.exports = { getPlayers: fplApi.getPlayers, getPlayer: fplApi.getPlayer };
