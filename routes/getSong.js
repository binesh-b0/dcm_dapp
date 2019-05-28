var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;

    console.log(data,"df",userId,userAddress);
    CR.methods.getSong(data.sid,userId)
        .call({ from: userAddress }).then((val)=>{
          console.log(val);
          ipfs.files.get(val._hash,function (err,files) {
            files.forEach((file)=>{
              fs.writeFile(data.sid+".mp3", file.content, function (err, file) {
                if (err) throw err;
                  console.log('Saved!');
                  CR.methods.getUser(userId)
                      .call({ from:userAddress }).then((val) => {
                          console.log(val);
                          res.download("${__dirname}/"+data.sid+".mp3");
                          // res.render("main", {val : val});
                      })
              });

          })
        });
      })
});

module.exports = router;
