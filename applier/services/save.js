const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const storage = require('@google-cloud/storage')();
const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = '6379';
const redisClient = redis.createClient(redisPort, redisHost);

const BUCKET_AUTOCOMPLETE = process.env.BUCKET_AUTOCOMPLETE || 'bucket-autocomplete';
// const AUTOCOMPLETE_FILENAME = process.env.AUTOCOMPLETE_FILENAME || 'autocompletes.json';;
// // const remoteFile = storage.bucket(BUCKET_AUTOCOMPLETE).file(AUTOCOMPLETE_FILENAME);


// // var getStream = function () {
// //   var jsonData = 'dataset/products.json',
// //     stream = fs.createReadStream(jsonData, { encoding: 'utf8' }),//,start:0,end:1000000}),
// //     parser = JSONStream.parse('*');
// //   return stream.pipe(parser);
// // };

var count=0;

var _loader = {};
_loader.start = (filename) => {
  const remoteFile=storage.bucket(BUCKET_AUTOCOMPLETE).file(filename);
  const readStream = () => {
    var gcsStream = remoteFile.createReadStream();
    var parser = JSONStream.parse('*');
    return gcsStream.pipe(parser);
  };
  readStream()
    .pipe(es.mapSync(function (data) {
      if (null == data.key || 0 == data.key.length) return;
      data.items.forEach((ele)=>{
        redisClient.zadd("auto:" + data.key.toLocaleUpperCase(), ele.rank, ele.name);
        // console.log(`added ${ele.name} with rank ${ele.rank}`);
        count++;
      });
    })).on('end', () => {
      console.log("Import done:"+count);
    });
}
_loader.stop=() => {
  redisClient.quit();
}


module.exports = _loader;

