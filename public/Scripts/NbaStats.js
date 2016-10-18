/**
 * Created by cowmo on 10/17/2016.
 */
const STATS_ITERATOR = 26;
var express = require('express');
var request = require('request');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function NbaStats(playerId){
    this.playerId = playerId;
    this.jsonResponse = null;
    this.numberOfSeasons = null;

}

NbaStats.prototype.findStats = function(){

    var url = "http://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID="+this.playerId;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, false);
    xhr.send(null);
    var data = xhr.responseText;
    // var jsony = JSON.stringify(data);
    this.jsonResponse = JSON.parse(data);
    this.numberOfSeasons = this.jsonResponse['resultSets'][0]['rowSet'].length;

    //console.log(jsonResponse['resultSets'][0]['rowSet'][0][0]);

    extractStats(this.jsonResponse, this.numberOfSeasons);
}
NbaStats.prototype.findStatsSpecificSeason = function(season){

}

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
module.exports = NbaStats;

