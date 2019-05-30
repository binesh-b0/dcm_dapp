var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
      songBytes = req.files.song.data;
      console.log('songBytes',songBytes);
    console.log(data);
    ipfs.files.add(songBytes,function(err,file){
     if(err) throw err;
     ipfsHash = file[0].hash;
     console.log("ipfs",ipfsHash);
      CR.methods.checkHashExists(ipfsHash).call({from:userAddress}).then(async (val)=>{
        if(!val){
     CR.methods.registerCopyright(data.sid,userId,data.name,userAddress,ipfsHash,data.price )
         .send({ from: userAddress , gas : 6000000 });
     res.send("song published !")
        }
        else{
          res.send("error")
        }
  });
    });
});

module.exports = router;
