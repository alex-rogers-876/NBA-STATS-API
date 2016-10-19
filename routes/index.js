var express = require('express');
var Stats = require('../public/Scripts/NbaStats.js')
var request = require('request');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const STATS_ITERATOR = 26;
function extractStats(jsonStats, numberOfSeasons){
  //console.log(numberOfSeasons);
  var stats = new Array(nbaStats);

  for(var i = 0; i < numberOfSeasons; i++) {
    var nummy = 0;
    for (var k in nbaStats) {
   //   console.log(k);
      nbaStats[k] = jsonStats['resultSets'][0]['rowSet'][i][nummy];
       // console.log(nbaStats.playerId);
      nummy++;
    }
    stats[i] = nbaStats;

    console.log(stats[i]);
  }
}

/* GET home page. */
var nbaStats= {
  playerId: "",
  seasonId: "",
  leagueId: "",
  teamId: "",
  teamAbrv:"",
  playerAge:"",
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
  var statsy = new Stats(req.query.playerId);
 // statsy.initializeStats();
  statsy.findStatsSpecificSeason(0);
  /*
  var url = "http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID="+req.query.playerId;
  var xhr = new XMLHttpRequest();
  var numberOfSeasons = 0;
  xhr.responseType = 'json';
   xhr.open('GET', url, false);
  xhr.send(null);
  var data = xhr.responseText;

  // var jsony = JSON.stringify(data);
  var jsonResponse = JSON.parse(data);
numberOfSeasons = jsonResponse['resultSets'][0]['rowSet'].length;
 //console.log(jsonResponse['resultSets'][0]['rowSet'][0][0]);

extractStats(jsonResponse, numberOfSeasons);*/
  res.send( statsy.getAllStats());
 // res.render('index', { title: 'Express' });


});

module.exports = router;
