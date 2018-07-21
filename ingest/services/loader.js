const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const storage = require('@google-cloud/storage')();
const util = require('util');
const fsWriter = util.promisify(fs.writeFile);

const BUCKET_PRODUCT = process.env.BUCKET_PRODUCT || 'bucket-product';
const PRODUCT_FILE_NAME = process.env.PRODUCT_FILE_NAME || 'products.json';
const remoteProductFile = storage.bucket(BUCKET_PRODUCT).file(PRODUCT_FILE_NAME);

const BUCKET_AUTOCOMPLETE = process.env.BUCKET_AUTOCOMPLETE || 'bucket-autocomplete';
const AUTOCOMPLETE_FILENAME = process.env.AUTOCOMPLETE_FILENAME || 'autocompletes.json';;
const remoteAutocompleteBucket = storage.bucket(BUCKET_AUTOCOMPLETE);
const readStream = () => {
  var gcsStream = remoteProductFile.createReadStream();
  var parser = JSONStream.parse('*');
  return gcsStream.pipe(parser);
};

const regex = /\#{1,10}| {1,10}|\({1,10}|\){1,10}|\-{1,10}|\"{1,10}|\,{1,10}|\.{1,10}|\<{1,10}|\>{1,10}|\\{1,10}|\${1,10}|\/{1,10}|\+{1,10}/gi;

var productMap = new Map();
var wordMap = new Map();
var keyMap = new Map();

const MAX_LENGTH = 10;

var _loader = {};
_loader.start = () => {
  readStream()
    .pipe(es.mapSync(function (data) {
      if (null == data.name || 0 == data.name.length) return;
      if (!productMap.has(data.name)) productMap.set(data.name, Math.floor(Math.random() * 100) + 1000);

      var words = data.name.split(regex);
      
      words.filter((value) => {
        if (3 > value.length) return false;
        if (!wordMap.has(value))wordMap.set(value,Math.floor(Math.random() * 100));        
      });

    })).on('end', () => {
      keyMap.clear();      
      ingestWord(productMap, keyMap,2);
      ingestWord(wordMap, keyMap,10);
      
      var autocompleteList = Array.from(keyMap).map(x=>x[1]);
      console.log("key size:"+autocompleteList.length);
      fs.writeFile(`dataset/${AUTOCOMPLETE_FILENAME}`, JSON.stringify(autocompleteList), () => { });
      console.log(`dataset/${AUTOCOMPLETE_FILENAME}`);
      remoteAutocompleteBucket.upload(`dataset/${AUTOCOMPLETE_FILENAME}`)
        .then(() => {
          console.log(`uploaded to ${AUTOCOMPLETE_FILENAME}.`);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    });
}
/*
autolist item json
{
  key: ....,
  items:
  [
    {name: "lll",rank:"123"}
  ]
}
*/

function ingestWord(pmap, kmap,len) {
  pmap.forEach((value, key) => {
    var max = MAX_LENGTH < key.length ? MAX_LENGTH : key.length;
    setKeyMap(max,value,key,kmap,len);
  });
}
function setKeyMap(max,value,key,kmap,len){
  for (var i = 1; i <= max; i++) {
    var prefix = key.substring(0, i).toUpperCase();
    var obj = kmap.has(prefix)? kmap.get(prefix):{"key":prefix,"items":[]}
    obj.items.push({ "name": key,"rank": value});
    if(len<obj.items.length){
      obj.items.sort((a,b)=>{
        return b.rank-a.rank;
      });
      obj.items.pop();
    }
    kmap.set(prefix,obj);
  }
}


module.exports = _loader;

