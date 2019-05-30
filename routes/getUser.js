var express = require('express');
var router = express.Router();
router.post('/',function (req, res, next) {
  data = req.body;
  userId = data.uid;
  userAddress = data.address;
  songs =[];
  ar=[];
  CR.methods.getUser(data.uid).call({ from: data.address }).then(async (val) => {
    userAddress=data.address;
    userId=data.uid;
    ar=val[5].concat(val[6]);
    console.log("ar",ar);
    if (!ar.length) {
      res.render("main", {val : val,s:songs});
    }
    for(i=0;i<(val[3]+val[4]);i++){
      console.log(i);
      await CR.methods.songInfo(parseInt(ar[i])).call({from:userAddress}).then(function(song){
         songs.push({id:song[0],name:song[1],price:song[5],uid:song[3],hash:song[4]});

       }).catch((err)=>{console.log(err)})

    }
    console.log("erebde",songs);
      res.render("main", {val : val,s:songs});
  })
})

module.exports = router;
