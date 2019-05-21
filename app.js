var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import web3 library
var Web3 = require('web3');

//import compiled output of auction contract from build directory
var MyContractJSON  = require(path.join(__dirname, 'build/contracts/copyright.json'));

//Establish connection with local geth private chain
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// get contract address, from network id 5777 (here 5777 is the network id of geth private chain)
contractAddress = MyContractJSON.networks['4002'].address;

//print Contract Address
console.log(contractAddress);

const abi = MyContractJSON.abi;

SMS = new web3.eth.Contract(abi, contractAddress);

var indexRouter = require('./routes/index');
var getUserRouter = require('./routes/getUser');
var setUserRouter = require('./routes/setUser');
var publishRouter = require('./routes/publish');
var buyLicenseRouter = require('./routes/buyLicense');
var app = express();

userAddress="";
userId="";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getUser',getUserRouter);
app.use('/setUser', setUserRouter);
app.use('/publish', publishRouter);
app.use('/buyLicense', buyLicenseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
