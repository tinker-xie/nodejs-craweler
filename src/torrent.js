var cheerio = require('cheerio');
var request = require('request-promise');
var iconv = require('iconv-lite');
var EventProxy = require('eventproxy');
var fs = require("fs");

var ep = EventProxy.create();
var total = 1;
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

var result = {
    list: []
}

ep.on('finish', function(page) {
    if (total < 5) {
        total = total + 1;
        matches(total);
    } else {
        // fs.writeFile('text.json', JSON.stringify(result), function(error) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('save');
        //     }
        //     process.exit(1);
        // });
        process.exit(1);
    }

})

matches(total);

function matches(page) {
    var url = `https://www.torrentkitty.tv/search/Thz.la/${page}`;
    request({
        method: 'GET',
        'url': url,
        encoding: null,
        headers: headers
    }).then(function(body) {
        var content = iconv.decode(body, 'utf-8');
        $ = cheerio.load(content);
        // console.log(content);
        var matchListRow = $("#archiveResult tr");
        $(matchListRow).each(function(i, element) {
            if (i > 0) {
                var name = $(element).find('.name').text();
                var date = $(element).find('.date').text();
                var magnet = $(element).find('.action a').eq(1).attr('href');
                console.log(`${name} *********   ${date}`);
            }
        });
        ep.emit('finish');
    }).catch(function(err) {
        if (err) {
            console.error(err);
        }

        ep.emit('finish');
    });
}