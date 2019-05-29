var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    price=0;
    CR.methods.songInfo(data.sid).call().then(function(song){
      price = parseInt(song[4])+6000000;
    CR.methods.buyLicense(userId,data.sid)
        .send({ from: userAddress,value:price, gas : 6000000 });
    res.send("license purchased !")
  });
});

module.exports = router;
