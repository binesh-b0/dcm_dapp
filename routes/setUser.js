var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    SMS.methods.registerUser(data.uid, data.name )
        .send({ from: coinbase, gas : 6000000 });
    res.send("user Registered !")
});

module.exports = router;
