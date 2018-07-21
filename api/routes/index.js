var express = require('express');
var router = express.Router();
const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = '6379';
const client = redis.createClient(redisPort, redisHost);

/* GET home page. */
router.get('/:key', async function (req, res, next) {
  try {
    res.setHeader('Content-Type', 'application/json');
    // var result = await Product.find({ $text: { $search: req.params.key } }).select({"name":1, "_id":0}).sort({rank:-1}).limit(10);

    // { <field>: { $regex: /pattern/<options> } }
    //{ <field>: { $regex: /pattern/, $options: '<options>' } }
    //{ <field>: { $regex: 'pattern', $options: '<options>' } }
    client.zrevrange(`auto:${req.params.key.toUpperCase()}`, 0, 10, (err, sset) => {
      if(0==sset.length) console.log("MISSING: "+ req.params.key);
      res.send(JSON.stringify(sset));
    });
  }
  catch (err) {
    res.status(500).send("Error");
    console.error("Error",err);
  }
});

module.exports = router;
