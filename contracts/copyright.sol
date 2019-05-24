pragma solidity ^0.5.0;
contract copyright{
    struct song{
        uint id;
        uint ownerid;
        bool reg;
        string name;
        address payable owner;
        string hash;
        uint price;
        uint[] licenseHoldersList;
        mapping(uint =>bool) licenseHolders;
    }
    struct user{
        uint id;
        bool reg;
        string name;
        address payable addr;
        uint purchasedCount;
        uint publishedCount;
        uint[] purchasedSongs;
        uint[] publishedSongs;
    }
    mapping (uint =>song) songs;
    mapping (uint => user) users;
    mapping (string => bool) unique;

    function registerUser(uint _id,string memory _name,address payable _addr) public {
        require(!checkUserExists(_id),"user exists");
        users[_id].id = _id;
        users[_id].reg = true;
        users[_id].name = _name;
        users[_id].addr = _addr;
         users[_id].purchasedCount = 0;
         users[_id].publishedCount = 0;
    }
    function getUser(uint __id) public view returns(uint _id,address payable _addr,string memory _name,uint _purchasedCount,uint _publishedCount,uint[] memory _purchasedSongs,uint[] memory _publishedSongs){
        require(checkUserExists(__id),"user does not exist");
        _id =users[__id].id;
        _name =users[_id].name;
        _addr = users[_id].addr;
        _purchasedCount = users[_id].purchasedCount;
        _publishedCount = users[_id].publishedCount;
        _purchasedSongs= users[_id].purchasedSongs;
        _publishedSongs = users[_id].publishedSongs;
    }
    function checkUserExists(uint _uid) public view returns (bool) {
        return users[_uid].reg;
    }
    function checkSongExists(uint _sid) public view returns (bool) {
        return songs[_sid].reg;
    }

    function registerCopyright(uint _id ,uint _uid, string memory _name,address payable _owner,string memory _hash,uint _price) public {
        require(checkUserExists(_uid),"user does not exist");
        require(!checkSongExists(_id),"duplicate song id");
        require(!unique[_hash],"song has copyright");
        songs[_id].id = _id;
        songs[_id].reg = true;
        songs[_id].name = _name;
        songs[_id].owner = _owner;
        songs[_id].ownerid = _uid;
        songs[_id].hash=_hash;
        unique[_hash]=true;
        songs[_id].price=_price;
        users[_uid].publishedSongs.push(_id);
        users[_uid].publishedCount=users[_uid].publishedSongs.length;
    }
    function buyLicense(uint buyerid,uint songid) public payable{
        // users[buyerid].addr.send(msg.value);
        require(msg.value>songs[songid].price,"value less than price");
        require(checkUserExists(buyerid),"user doesn not exist");
        require(checkSongExists(songid),"song does not exist");
        require(!checkPurchased(buyerid,songid));
        users[buyerid].purchasedSongs.push(songid);
        users[buyerid].purchasedCount=users[buyerid].purchasedSongs.length;
        songs[songid].licenseHoldersList.push(buyerid);
        songs[songid].licenseHolders[buyerid]=true;
        songs[songid].owner.transfer(msg.value);
    }
    function checkPurchased(uint _uid, uint _sid) public view returns (bool) {
        return (songs[_sid].licenseHolders[_uid] ||songs[_sid].ownerid==_uid);
    }

    function songInfo(uint _sid) public view returns(uint _id,string memory _name,address payable _owner,string memory _hash,uint _price,uint[] memory _licenseHolderes){
        require(checkSongExists(_sid),"song doesnot exist");
        _id=_sid;
        _name=songs[_sid].name;
        _owner = songs[_sid].owner;
        _hash=songs[_sid].hash;
        _price=songs[_sid].price;
        _licenseHolderes = songs[_sid].licenseHoldersList;
    }
    function getSong(uint _sid,uint _uid) public view returns(string memory _name,string memory _hash) {
      require(checkUserExists(_uid),"user doesnot exist");
      require(checkSongExists(_sid),"song doesnot exist");
      require(checkPurchased(_uid, _sid),"user doesnot have license");
      _name = songs[_sid].name;
      _hash = songs[_sid].hash;
    }
}
