var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    songs =[];
    // CR.methods.sCount.call().then(function)
    CR.methods.getSongIds.call().then(function(songIds){
      console.log("songIds",songIds);
      for (var i = 0; i <= songIds.length; i++){
        CR.methods.songInfo(songIds[i]).call().then(function(song){
          songs.push({id:song[0],name:song[1],price:song[5],uid:song[3]});
          if(songs.length==songIds.length){
            CR.methods.getUser(data.uid)
                .call({ from: data.address }).then((val) => {
                    userAddress=data.address;
                    userId=data.uid;
                    res.render("main", {val : val,songs:songs});
                })
          }
        })
      }
    })

});

module.exports = router;
