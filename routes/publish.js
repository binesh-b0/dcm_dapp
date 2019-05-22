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

     SMS.methods.registerCopyright(data.sid,data.uid,data.name,userAddress,ipfsHash,data.price )
         .send({ from: userAddress , gas : 6000000 });
     res.send("song published !")

  });

});

module.exports = router;
