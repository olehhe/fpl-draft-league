/**
 * Created by Hellenes on 25/10/15.
 */

function getPlayersFromRemoteApi() {

  var api = "http://fantasy.premierleague.com/web/api/elements/";
  var maxPlayers = 0; // Subject to change

  var allPlayers = {}; // Temp storage before feeding to ElasticSearch

  for (var i = 0; i <= maxPlayers; i++) {

    var endpoint = api + i;
    var jqxhr = jQuery.getJSON("example_player.json");

    jqxhr.done(function (data) {

      var cleanData = elasticateJSON(data);
      allPlayers[i] = cleanData;

    });
  }


  /*
   Clean the data, making sure everything is stored
   in key/value pairs, and that all array entries
   are of the same data type.
   */
  function elasticateJSON(json) {

    var newJson = {};

    for (var key in json) {

      if (key === "event_explain" || key === "fixture_history" || key === "fixtures") {

        newJson[key] = getSanitizedValue(key, json[key]);
        continue;
      }

      newJson[key] = json[key];
    }

    return newJson;


    function getSanitizedValue(key, value) {

      var newValue = {};
      var subValue;

      if (key === "event_explain") {

        for (var item in value) {
          subValue = value[item];
          var _key = subValue[0];

          newValue[_key] = {
            "value": subValue[1],
            "points": subValue[2]
          };
        }

        return newValue;
      }

      if (key === "fixture_history" || key === "fixtures") {

        for (var item in value) {

          subValue = value[item];
          var mappingArr = getMappingArr(key, item);
          if (mappingArr) {

            for (var i = 0; i < subValue.length; i++) {

              var newVal = createAssosiativeArray(mappingArr, subValue[i]);
              subValue[i] = newVal;
            }
          }

          newValue[item] = subValue;
        }

        return newValue;
      }

      function getMappingArr(parentKey, key) {

        var fixture_history_all = [
          "datetime",
          "round",
          "opponent",
          "minutes_played",
          "goals_scored",
          "assists",
          "clean_sheets",
          "goals_conceded",
          "own_goals",
          "penalties_saved",
          "penalties_missed",
          "yellow_cards",
          "red_cards",
          "saves",
          "bonus",
          "ea_sports_ppi",
          "bonus_points_system",
          "net_transfers",
          "value",
          "points"
        ];

        var fixture_history_summary = [
          "gameweek",
          "opponent",
          "points"
        ];

        var fixtures_all = [
          "datetime",
          "gameweek",
          "opponent"
        ];

        var fixtures_summary = [
          "gameweek",
          "opponent",
          "datetime"
        ];

        switch (parentKey) {
          case "fixture_history":
            return (key == "all")
              ? fixture_history_all
              : fixture_history_summary;
          case "fixtures":
            return (key == "all")
              ? fixtures_all
              : fixtures_summary;
          default:
            return null;
        }
      }

      function createAssosiativeArray(arr1, arr2) {

        var arr = {};
        for (var i = 0; i < arr1.length; i++) {

          arr[arr1[i]] = arr2[i];

        }

        return arr;
      }

    }

  }

}
