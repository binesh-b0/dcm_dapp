var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    SMS.methods.registerCopyright(data.sid,data.uid,data.name,userAddress,"",data.price )
        .send({ from: userAddress , gas : 6000000 });
    res.send("song published !")
});

module.exports = router;
