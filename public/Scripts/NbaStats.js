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
    this.seasonList = new Array();
    this.statsList = new Array(nbaStats);

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

    this.statsList= extractStats(this.jsonResponse, this.numberOfSeasons) ;
    this.seasonList = buildListOfSeasons(this.statsList, this.numberOfSeasons);
    console.log(this.seasonList);

}

NbaStats.prototype.initializeStats = function(){
/*
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

   this.statsList= extractStats(this.jsonResponse, this.numberOfSeasons) ;
    this.seasonList = buildListOfSeasons(this.statsList);
    console.log(this.seasonList);
*/
}
NbaStats.prototype.getAllStats = function(){
    return this.statsList;
}

NbaStats.prototype.findStatsSpecificSeason = function(season){
    console.log(this.statsList[season]);
    return this.statsList[season];
}

NbaStats.prototype.getSeasonList = function(){
    return this.seasonList;
}

function extractStats(jsonStats, numberOfSeasons){
    var statsyList = new Array(nbaStats);
    //console.log(numberOfSeasons);
    for(var i = 0; i < numberOfSeasons; i++) {
        var nbaStatsy = { };
        var nummy = 0;
        for (var k in nbaStats) {
            //   console.log(k);
            nbaStatsy[k] = jsonStats['resultSets'][0]['rowSet'][i][nummy];
            // console.log(nbaStats.playerId);
            nummy++;
        }
        //this.seasonList[i]
        statsyList[i] = nbaStatsy;
       // this.seasonList[i] = nbaStats.seasonId;
       // console.log(this.statsList[i]);
    }
        return statsyList;
}
function buildListOfSeasons(statsList, numberOfSeasons){
    var list = new Array();
    for(var i = 0; i < numberOfSeasons; i++){
        list[i] = statsList[i].seasonId;
    }
    return list;

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

