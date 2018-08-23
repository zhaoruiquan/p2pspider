
 'use strict';
var P2PSpider = require('../lib');
 var fs = require('fs'),
 path = require('path');

var p2p = P2PSpider({
    nodesMaxSize: 200,   // be careful
    maxConnections: 400, // be careful
    timeout: 5000
});

p2p.ignore(function (infohash, rinfo, callback) {
    // false => always to download the metadata even though the metadata is exists.
    var theInfohashIsExistsInDatabase = false;
    callback(theInfohashIsExistsInDatabase);
});

p2p.on('metadata', function (metadata) {

    fs.appendFile('message.txt', JSON.stringify(metadata),function (err) {
        if(err) {
            console.error(err);
        } else {
            console.log('写入成功');
        }
    });


});

p2p.listen(6881, '0.0.0.0');