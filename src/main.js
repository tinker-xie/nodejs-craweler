var cheerio = require('cheerio');
var request = require('request');
var page = 0;
var pageSize = 50;

for (var i = 0; i < 2; i++) {
   matches(i);
}


function matches(page) {
    var url = `http://www.hltv.org/results/${page}/`;
    console.log(`－－－－－－－－－－－－－－     ${url}     －－－－－－－－－－－－－`)
    request({
        method: 'GET',
        url: url
    }, function(err, response, body) {
        if (err) return console.error(err);

        // Tell Cherrio to load the HTML
        $ = cheerio.load(body);
        var matchListRow = $('.matchListRow');

        $(matchListRow).each(function(i, element) {
            var matchMap = $(element).children().eq(0).text();
            var homeTeam = $(element).children().eq(1).text().trim();
            var homeTeamCrest = $(element).children().eq(1).find('img').attr('src');
            var homeTeamScore = parseInt($(element).children().eq(2).children('span').first().text());
            var awayTeamScore = parseInt($(element).children().eq(2).children('span').last().text());
            var awayTeam = $(element).children().eq(3).text().trim();
            var awayTeamCrest = $(element).children().eq(3).find('img').attr('src');
            var matchid = $(element).children().eq(4).children('a').attr('href').split('match/')[1];

            var resultData = {
                matchMap: matchMap,
                homeTeam: homeTeam,
                homeTeamCrest: homeTeamCrest,
                homeTeamScore: homeTeamScore || 0,
                awayTeamScore: awayTeamScore || 0,
                awayTeam: awayTeam,
                awayTeamCrest: awayTeamCrest,
                matchid: matchid
            };
            console.log(resultData);

        });
        console.log(`－－－－－－－－－－－－－－     ${url}     －－－－－－－－－－－－－`)
    });
}

// －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

function results() {
    var url = "http://www.hltv.org/results/#begin#/";
    url = url.replace('#begin#', page * pageSize);
    console.log(url);
    console.log(`－－－－－－－－－－－－－－    ${url}     －－－－－－－－－－－－－`)
    request({
        method: 'GET',
        url: url
    }, function(err, response, body) {
        if (err) return console.error(err);

        // Tell Cherrio to load the HTML
        $ = cheerio.load(body);
        var matchListRow = $('.matchListRow');

        $(matchListRow).each(function(i, element) {
            var matchMap = $(element).children().eq(0).text();
            var homeTeam = $(element).children().eq(1).text().trim();
            var homeTeamCrest = $(element).children().eq(1).find('img').attr('src');
            var homeTeamScore = parseInt($(element).children().eq(2).children('span').first().text());
            var awayTeamScore = parseInt($(element).children().eq(2).children('span').last().text());
            var awayTeam = $(element).children().eq(3).text().trim();
            var awayTeamCrest = $(element).children().eq(3).find('img').attr('src');
            var matchid = $(element).children().eq(4).children('a').attr('href').split('match/')[1];

            var resultData = {
                matchMap: matchMap,
                homeTeam: homeTeam,
                homeTeamCrest: homeTeamCrest,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                awayTeam: awayTeam,
                awayTeamCrest: awayTeamCrest,
                matchid: matchid
            };
            console.log(resultData);

        });
        console.log(`－－－－－－－－－－－－－－    ${url}     －－－－－－－－－－－－－`)
    });
}
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
