var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    songs =[];
    songs2=[];
    available = false;
    userId = data.uid;
    userAddress = data.address;
    CR.methods.getSongIds.call().then(function(songIds){
      if(songIds.length==0){
        CR.methods.getUser(data.uid)
            .call({ from: data.address }).then((val) => {
                userAddress=data.address;
                userId=data.uid;
                res.render("main", {val : val,songs:songs,songs2:songs});

            })
      }
      for (var i = 0; i <= songIds.length; i++){
        console.log(i,songIds,songs,songs2);
        if(i>=songIds.length){
          CR.methods.getUser(data.uid)
              .call({ from: data.address }).then((val) => {
                  userAddress=data.address;
                  userId=data.uid;

                  res.render("main", {val : val,songs:songs,songs2:songs2});
              })
        }
        console.log("dd",songIds[i]);
        CR.methods.songInfo(songIds[i]).call().then(function(song){
          available=false;
    
          CR.methods.checkPurchased(userId,songIds[i]).call({from:userAddress}).then(function(available){
            console.log(song[3],userId,available,"sdf");
            if (available) {
              console.log(available);
          songs.push({id:song[0],name:song[1],price:song[5],uid:song[3],hash:song[4]});
            }
            else {
              console.log(available);
              songs2.push({id:song[0],name:song[1],price:song[5],uid:song[3]});
            }
            console.log(i,songIds.length);

        });
        })
      }
    })

});

module.exports = router;
