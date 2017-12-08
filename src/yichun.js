var cheerio = require('cheerio');
var request = require('request-promise');
var iconv = require('iconv-lite');
var EventProxy = require('eventproxy');
var fs = require("fs");

var PATH = '/Users/xie/Documents/images/';
var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

var ep = EventProxy.create();
var total = 1;

var result = {
    list: []
}

ep.on('finish', function(page) {
    if (total < 10) {
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
    var url = `http://www.yichun0795.com/house/chushou.html?Colname=&KeyWord=&PageNo=${page}&lei=&bigid=&smallid=&price=&huxing=&teshe=&zhuangxiu=&paixu=&tt1=&tt2=&size=`;
    request({
        method: 'GET',
        'url': url,
        encoding: null,
        headers: headers
    }).then(function(body) {
        var content = iconv.decode(body, 'utf-8');
        $ = cheerio.load(content);
        // console.log(content);
        var matchListRow = $(".con");
        $(matchListRow).each(function(i, element) {
            var title = $(element).find('.hy_t a').eq(0).text();
            var name = $(element).find('p').eq(0).text();
            var rooms = $(element).find('li').text();
            var meters = $(element).find('.date').eq(0).text();
            var price = $(element).find('.price').eq(0).text();
            console.log(`${title} - ${name} - ${rooms} - ${meters} - ${price}`);
        });
        ep.emit('finish');
    }).catch(function(err) {
        if (err) {
            console.error(err);
        }

        ep.emit('finish');
    });
}