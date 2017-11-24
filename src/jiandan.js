var cheerio = require('cheerio');
var request = require('request-promise');
var iconv = require('iconv-lite');
var EventProxy = require('eventproxy');
var fs = require("fs");

var PATH = '/Users/xie/Documents/images/';

var ep = EventProxy.create();
var total = 160;

var result = {
    list: []
}

ep.on('finish', function(page) {
    total = total - 1;
    if (total > 0) {
        matches(total);
    } else {
        fs.writeFile('images.json', JSON.stringify(result), function(error) {
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
    var url = `http://jandan.net/pic/page-${page}#comments`;
    request({
        method: 'GET',
        url: url,
        encoding: null
    }).then(function(body) {
        var content = iconv.decode(body, 'utf-8');
        $ = cheerio.load(content);
        var matchListRow = $('.view_img_link');
        $(matchListRow).each(function(i, element) {
            var item = $(element).attr('href');
            var res_url = 'http:' + item;
            // var name = PATH + item.slice(item.lastIndexOf('/') + 1);
            result.list.push(res_url);
            // request(res_url).on('response', function(response) {
            //     console.log(response.statusCode) // 200
            // }).pipe(fs.createWriteStream(name));
        });
        ep.emit('finish');
    }).catch(function(err) {
        if (err)
            return console.error(err);
    });
}