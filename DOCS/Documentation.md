  *MUSIC DAPP*

UI USERGUIDE:

1) Open localhost:3000 in google chrome browser (use google chrome for better working)
2) Register user with name ,userid, account address
3) To getting the address in javascript console type eth.accounts
4)Before truffle compile ,check account balance by eth.getBalance(eth.getBalance(eth.accounts[0]))

5)If running out of gas then tranfer some ether to each account using 
eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:50000000000000})      //transfer to every account .
6) Copy and paste account address
7)After registration successfull Login the user by giving uid and address
  Registered user can pubish a song by giving songid, songName & price of the song.
8) Choose a file and publish ,it directly uploads to IPFS.
9) Likewise Register another user & login.
10) If he wants to publish a song he can.
11) If he wants to buy a song that another user published, give songID and buy.
12)Refresh the page, it shows songID,songName,Publisher , and small audio tab to play the music.
13)Downloading access is restricted

