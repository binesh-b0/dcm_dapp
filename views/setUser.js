var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    CR.methods.registerUser(data.uid, data.name,data.address )
        .send({ from: data.address, gas : 6000000 });
    res.send("user Registered !")
});

module.exports = router;
