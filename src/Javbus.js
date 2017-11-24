var cheerio = require('cheerio');
var request = require('request-promise');
var iconv = require('iconv-lite');
var EventProxy = require('eventproxy');

var ep = EventProxy.create();

var host = 'https://www.javbus.com';

matches();


ep.on('finish', function(page) {
    process.exit(1);
})

function matches() {
    var url = `${host}`;

    request({
        method: 'GET',
        url: url,
        encoding: null,
        // timeout: 3000
    }).then(function(body) {
        var content = iconv.decode(body, 'utf-8')
        console.log(content);
        $ = cheerio.load(content);

        ep.emit('finish');
    }).catch(function(err) {
        if (err)
            return console.error(err);
    });
}
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－