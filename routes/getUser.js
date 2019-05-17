var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    data = req.query;
    console.log(data);
    SMS.methods.getUser(data.uid)
        .call({ from: coinbase }).then((val) => {
            console.log(val);
           
            // res.render("getStudent", {myData : val});
        })
});

module.exports = router;
