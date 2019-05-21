var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    SMS.methods.getUser(data.uid)
        .call({ from: data.address }).then((val) => {
            console.log(val);
            userAddress=data.address;
            userId=data.uid;
            res.render("main", {val : val});
        })
});

module.exports = router;
