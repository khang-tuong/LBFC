var app = require('../../app')
var http = require('http');


module.exports = {
    sendRequest: function(url, data, callback) {
        var options = {
            host: 'localhost',
            port: 42013,
            path: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        var httpRequest = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                console.log("body: " + chunk);
                callback(chunk);
            });
            response.on('error', function(chunk){
                console.log("error: " + chunk);
            });
            response.on('end', function (response) {
                //response.send('ok');
            })
        });

        httpRequest.write(data);
        httpRequest.end();
    }
}