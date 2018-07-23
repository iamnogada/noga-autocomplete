var express = require('express');
var router = express.Router();
const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = '6379';
const client = redis.createClient(redisPort, redisHost);

/* GET home page. */
router.get('/:key/:tag', autocomplete);
router.get('/:key', autocomplete);

async function autocomplete(req, res, next) {
  try {
    res.setHeader('Content-Type', 'application/json');

    // { <field>: { $regex: /pattern/<options> } }
    //{ <field>: { $regex: /pattern/, $options: '<options>' } }
    //{ <field>: { $regex: 'pattern', $options: '<options>' } }
    client.zrevrange(`auto:${req.params.key.toUpperCase()}`, 0, 10, (err, sset) => {
      if (0 == sset.length){
        console.log("MISSING: " + req.params.key);
        res.status(404).send('No data');
      } else{
        res.json(sset);
      }
      
      // res.send(JSON.stringify(sset));
    });
  }
  catch (err) {
    res.status(500).send("Error");
    console.error("Error", err);
  }
};

module.exports = router;
