var cheerio = require('cheerio');
var request = require('request-promise');
var iconv = require('iconv-lite');
var EventProxy = require('eventproxy');
var fs = require("fs");

var PATH = '/Users/xie/Documents/images/';

var ep = EventProxy.create();
var total = 33848;

var result = {
    list: []
}

ep.on('finish', function(page) {
    total = total + 1;
    matches(total);
    if (total < 33900) {
        matches(total);
    } else {
        fs.writeFile('text.json', JSON.stringify(result), function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('save');
            }
            process.exit(1);
        });

    }
})

matches(total);

function matches(page) {
    var url = `http://www.siandian.com/haojuzi/${page}.html`;
    request({
        method: 'GET',
        url: url,
        encoding: null
    }).then(function(body) {
        var content = iconv.decode(body, 'gb2312');
        $ = cheerio.load(content);
        var matchListRow = $('.articleText').children('p');
        $(matchListRow).each(function(i, element) {
            var text = $(element).first().text();
            text = text.substring(text.indexOf('、') + 2);
            result.list.push(text);
        });
        ep.emit('finish');
    }).catch(function(err) {
        if (err) {
            console.error(err);
        }

        ep.emit('finish');
    });
}