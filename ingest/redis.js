const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const redis = require('redis');
const client = redis.createClient(6379,"127.0.0.1");

var getStream = function () {
    var jsonData = 'data/words.json',
        stream = fs.createReadStream(jsonData, { encoding: 'utf8' }),//,start:0,end:1000000}),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

var wordset = new Array();
var count=0;

getStream()
    .pipe(es.mapSync(function (data) {
        if (null == data.name || 0 == data.name.length) return;
        const rank = Math.floor(Math.random() * 1000);
        const index= data.name[0];
        client.zadd("auto:"+data.name[0],rank,data.name);
        console.log("count:"+count++);
    })).on('end', () => {
    console.log('There will be no more data.');
    console.log("Count: " + wordset.length);

});