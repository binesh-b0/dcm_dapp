pragma solidity ^0.5.0;
contract copyright{
    struct song{
        uint id;
        string name;
        address payable owner;
        string url;
        uint price;
        uint[] licenseHolderes;
    }
    struct user{
        uint id;
        string name;
        address payable addr;
        uint purchasedCount;
        uint publishedCount;
        uint[] purchasedSongs;
        uint[] publishedSongs;
    }
    mapping (uint =>song) songs;
    mapping (uint => user) users;
    
    function registerUser(uint _id,address payable _addr,string memory _name) public {
        users[_id].id = _id;
        users[_id].name = _name;
        users[_id].addr = _addr;
         users[_id].purchasedCount = 0;
         users[_id].publishedCount = 0;
    }
    function showUsers(uint __id) public view returns(uint _id,address payable _addr,string memory _name,uint _purchasedCount,uint _publishedCount){
        _id =users[__id].id;
        _name =users[_id].name;
        _addr = users[_id].addr;
        _purchasedCount = users[_id].purchasedCount;
        _publishedCount = users[_id].publishedCount;
    }
    
    function registerCopyright(uint _id ,uint _uid, string memory _name,address payable _owner,string memory _url,uint _price) public {
        songs[_id].id = _id;
        songs[_id].name = _name;
        songs[_id].owner = _owner;
        songs[_id].url=_url;
        songs[_id].price=_price;
        users[_uid].publishedSongs.push(_id);
        users[_uid].publishedCount=users[_id].publishedSongs.length;
    }
    function buyLicence(uint buyerid,uint songid) public payable{
        // users[buyerid].addr.send(msg.value);
        users[buyerid].purchasedSongs.push(songid);
        users[buyerid].purchasedCount=users[buyerid].purchasedSongs.length;
        songs[songid].licenseHolderes.push(buyerid);
        songs[songid].owner.transfer(msg.value);
        
    }
}