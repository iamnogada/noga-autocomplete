const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const storage = require('@google-cloud/storage')();

const BUCKET_PRODUCT = process.env.BUCKET_PRODUCT || 'bucket-product';
const PRODUCT_FILE_NAME = process.env.PRODUCT_FILE_NAME || 'products.json';
const remoteProductFile = storage.bucket(BUCKET_PRODUCT).file(PRODUCT_FILE_NAME);

const BUCKET_AUTOCOMPLETE = process.env.BUCKET_AUTOCOMPLETE || 'bucket-autocomplete';
const AUTOCOMPLETE_FILENAME = process.env.AUTOCOMPLETE_FILENAME || 'autocompletes.json';;
const remoteAutocompleteBucket = storage.bucket(BUCKET_AUTOCOMPLETE);
// var getStream = function () {
//   var jsonData = 'dataset/products.json',
//     stream = fs.createReadStream(jsonData, { encoding: 'utf8' }),//,start:0,end:1000000}),
//     parser = JSONStream.parse('*');
//   return stream.pipe(parser);
// };
const readStream = () => {
  var gcsStream = remoteProductFile.createReadStream();
  var parser = JSONStream.parse('*');
  return gcsStream.pipe(parser);
};

// const writeStream = () =>{
//   var gcsStream = remoteAutocompleteFile.createWriteStream();
//   return gcsStream.pipe(parser);
// }



var wordset = new Array();
var autocompleteList = new Array();
var _loader={};
_loader.start = ()=>{
  readStream()
  .pipe(es.mapSync(function (data) {
    if (null == data.name || 0 == data.name.length) return;
    var words = data.name.split(/ {1,10}|\({1,10}|\){1,10}|\-{1,10}/gi);
    if (2 > words.length) return;
    words.filter((value) => {
      if (3 > value.length) return false;
      if (wordset.includes(value)) {
        // console.log("exists:"+ value);
        return false;
      }
      wordset.push(value);
      var rank;
      if (4 < value.length && 10 > value.length) rank = Math.floor(Math.random() * 100) + 1000;
      else rank = Math.floor(Math.random() * 100);
      var item = new Object({ "name": value, "rank": rank })
      autocompleteList.push(item);
    });
    //data.rank = Math.floor(Math.random() * 1000);
    // wordset.push(data);
  })).on('end', () => {
    console.log('There will be no more data.');
    fs.writeFile(`dataset/${AUTOCOMPLETE_FILENAME}`, JSON.stringify(autocompleteList), () => { });
    remoteAutocompleteBucket.upload(`dataset/${AUTOCOMPLETE_FILENAME}`)
    .then(() => {
      console.log(`uploaded to ${AUTOCOMPLETE_FILENAME}.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END storage_u;
    console.log("Count: " + wordset.length);
    // var gcsStream = remoteAutocompleteFile.createWriteStream();
    // gcsStream.write(JSON.stringify(autocompleteList));
  });
}



module.exports = _loader; 

