var express = require('express');

var request = require('request');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
  xhr.responseType = 'json';
   xhr.open('GET', url, false);
  xhr.send(null);
  var data = xhr.responseText;

  // var jsony = JSON.stringify(data);
  var jsonResponse = JSON.parse(data);

  console.log(jsonResponse['resultSets'][0]['rowSet'][0][0]);


  res.render('index', { title: 'Express' });


});

module.exports = router;
