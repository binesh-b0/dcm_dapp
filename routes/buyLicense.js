var express = require('express');
var router = express.Router();

router.post('/buyLicence', function (req, res, next) {
    data = req.body;
    console.log(data);
    SMS.methods.registerCopyright(data.sid,data.uid data.name,userAddress,"",data.price )
        .send({ from: data.address, gas : 6000000 });
    res.send("license purchased !")
});

module.exports = router;
