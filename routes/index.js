var express = require('express');

var request = require('request');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const STATS_ITERATOR = 26;
function extractStats(jsonStats, numberOfSeasons){
  console.log(numberOfSeasons);
  var stats = new Array(nbaStats);
  var nummy = 0;
  for(var i = 0; i < numberOfSeasons; i++) {
    for (var k = 0; k < STATS_ITERATOR; k++) {
      //console.log(k);
      stats[i][k] = jsonStats['resultSets'][0]['rowSet'][i][k];
        console.log(stats[i][nummy]);
      nummy++;
    }
  }
}

/* GET home page. */
var nbaStats= {
  playerId: "",
  seasonId: "",
  leagueId: "",
  teamId: "",
  teamAbrv:"",
  gamesPlayed: "",
  gamesStarted: "",
  minutes: "",
  fgm:"",
  fga:"",
  fgPercent:"",
  fg3m: "",
  fg3a: "",
  fg3Percent:"",
  ftm:"",
  fta:"",
  ftPercent:"",
  oReb:"",
  dReb:"",
  totReb:"",
  ast:"",
  stl:"",
  blk:"",
  tov:"",
  pf: "",
  pts:""
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nba', function(req, res, next) {
  var url = "http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID=202331";
  var xhr = new XMLHttpRequest();
  var numberOfSeasons = 0;
  xhr.responseType = 'json';
   xhr.open('GET', url, false);
  xhr.send(null);
  var data = xhr.responseText;

  // var jsony = JSON.stringify(data);
  var jsonResponse = JSON.parse(data);
numberOfSeasons = jsonResponse['resultSets'][0]['rowSet'].length;
 console.log(jsonResponse['resultSets'][0]['rowSet'][0][0]);

extractStats(jsonResponse, numberOfSeasons);
  res.render('index', { title: 'Express' });


});

module.exports = router;
