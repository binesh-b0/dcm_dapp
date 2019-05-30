var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    CR.methods.checkUserExists(data.uid).call({from:data.address}).then(async (val)=>{
      if(val){
        res.send("error")
      }
      else {
      await  CR.methods.registerUser(data.uid, data.name,data.address )
            .send({ from: data.address, gas : 6000000 }).catch((error)=>res.send("error"));;
        res.send("user Registered !")
      }
    })

});

module.exports = router;
