var cheerio = require('cheerio');
var request = require('request-promise');
var iconv = require('iconv-lite');
var EventProxy = require('eventproxy');

var ep = EventProxy.create();

var host = 'http://www.avtb567.com';

matches(2);


ep.on('finish', function(page) {
    console.log('------------------------- page   ' + page + '-------------------------');
    if (page < 490) {
        ++page
    }else{
    	process.exit(1);
    }
    matches(page);
})

function matches(page) {
    var url = `${host}/recent/${page}/`;
    request({
        method: 'GET',
        url: url,
        encoding: null
    }).then(function(body) {
        var content = iconv.decode(body, 'utf-8')
        $ = cheerio.load(content);
        var matchListRow = $('.video');
        $(matchListRow).each(function(i, element) {
            var href = $(element).children().eq(0).attr("href");
            var title = $(element).children().eq(0).attr("title");
            console.log(`[${title}](!${host}/embed`+href+")");
        });
        ep.emit('finish', page);
    }).catch(function(err) {
        if (err) return console.error(err);
    });
}
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
