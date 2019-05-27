var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data,"df",userId,userAddress);
    CR.methods.buyLicense(userId,data.sid)
        .send({ from: userAddress,value:data.amount, gas : 6000000 });
    res.send("license purchased !")
});

module.exports = router;
