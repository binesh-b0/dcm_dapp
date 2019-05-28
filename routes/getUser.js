var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    songs =[];
    songs2=[];
    available = false;
    CR.methods.getSongIds.call().then(function(songIds){
      console.log("songIds",songIds);
      if(songIds.length==0){
        CR.methods.getUser(data.uid)
            .call({ from: data.address }).then((val) => {
                userAddress=data.address;
                userId=data.uid;
                res.render("main", {val : val,songs:songs,available_songs:songs2});
            })
      }
      for (var i = 0; i <= songIds.length; i++){
        CR.methods.songInfo(songIds[i]).call().then(function(song){
          available=false;
          CR.methods.checkPurchased(song[3],song[0]).call({from:userAddress}).then(function(available){
            if (available) {
          songs.push({id:song[0],name:song[1],price:song[5],uid:song[3]});
        }
        else {
          songs2.push({id:song[0],name:song[1],price:song[5],uid:song[3]});

        }
          if(songs.length==songIds.length){
            CR.methods.getUser(data.uid)
                .call({ from: data.address }).then((val) => {
                    userAddress=data.address;
                    userId=data.uid;
                    res.render("main", {val : val,songs:songs});
                })
          }
        });
        })
      }
    })

});

module.exports = router;
