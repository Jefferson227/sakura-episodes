var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var app = express();
var baseUrl = 'http://www.animesonlinebr.com.br/';
var port = process.env.PORT || 3000;


app.get('/', function (req, res) {
    const url = `${baseUrl}dublados/436`;

    request(url, function (error, response, html) {
        if (!error) {
            const $ = cheerio.load(html);
            let links = '';

            $('ul.lcp_catlist.list li').each((index, el) => {
                const videoId = $(el).find('a').attr('href').split('/')[4];
                const videoTitle = $(el).find('a').html();

                links += `<a href='video/${videoId}'>${videoTitle}</a><br>`;
            });

            res.send(links);
        }
        else {
            res.send(error);
        }
    });
});

app.get('/video/:id', function (req, res) {
    const url = `${baseUrl}video/${req.params.id}`;

    request(url, function (error, response, html) {
        if (!error) {
            const $ = cheerio.load(html);
            res.send($('#p1').html());
        }
        else {
            res.send(error);
        }
    });
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});