const http = require('http');
const querystring = require('querystring');
const config = require('../config.json');
// Script for emitting data when it's online
// Input will be either TRUE or FALSE
module.exports = (online, serverID, serverIP) => {  
    console.log('Emitting..')
    let mainIP = config.mainserver
    let postData = querystring.stringify({
        verified: "true",
        emitStatus: online,
        serverID: serverID,
        serverIP: serverIP
     });
    let options = {
        hostname: mainIP,
        port: 3000,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
    let req = http.request(options, function (res) {

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            console.log(chunk);
        });

        res.on('end', function () {
        });
    });

    req.on('error', function (e) {
        console.error(e);
    });
    req.write(postData);
    req.end();
}