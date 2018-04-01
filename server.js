var express = require('express'),
  app = express(),
  path = require('path'),
  fs = require('fs'),
  _ = require("lodash"),
  methodOverride = require("method-override"),
  bodyParser = require('body-parser'),
  moment = require('moment'),
  util = require('util'),
  expressValidator = require('express-validator'),
  jwt = require('jsonwebtoken'),
  passport = require("passport"),
  passportJWT = require("passport-jwt"),

  data = require('./src/mongoModels/volumes.json'),
  users = require('./src/mongoModels/users.json');

ExtractJwt = passportJWT.ExtractJwt;
JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'noMoreSecrets';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload.id);

  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);


//app.use(express.logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(expressValidator());

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));
// For put/delete requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('X-HTTP-Method-Override', 'DELETE');
  res.header('X-HTTP-Method-Override', 'PUT');
  next();
});

// Auth
app.use(passport.initialize());


// Routes
//Index route
app.get('/', function (req, res) {
  res.send(data);
});

// Create route
app.post('/', function (req, res) {
  res.send('Got a POST request');
  data.push(req.body);

  writeToFs('volumes', data);

});

// Delete  route
app.delete('/product/:id', function (req, res) {
  var index = req.query.index;
  data.splice(index, 1);

  writeToFs('volumes', data);

  res.send('delete request');
});


//Login route
app.post('/auth/login', function (req, res) {

  //Check that the name field is not empty
  req.checkBody('login', 'Login is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

//Trim and escape the  fields.
  req.sanitize('login').escape();
  req.sanitize('login').trim();
  req.sanitize('password').escape();
  req.sanitize('password').trim();

//Run the validators
  var errors = req.validationErrors();

  if (req.body.login && req.body.password) {
    var login = req.body.login;
    var password = req.body.password;
  }

  var user = users[_.findIndex(users, {login: login})];
  if (!user) {
    res.status(401).json({message: "no such user found"});
  }

  if (user.password === req.body.password) {
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({
      type: true,
      message: "ok",
      token: token
    });
  } else {
    res.status(401).json({
      type: false,
      message: "passwords did not match"
    });

  }

});

// Register route

app.post('/auth/register', function (req, res) {

  req.checkBody('email', 'Invalid Email').isEmail();
  req.checkBody('password', 'Invalid Password').notEmpty();
  //Run the validators
  var errors = req.validationErrors();


  var user = users[_.findIndex(users, {email: req.body.email, password: req.body.password})];
  console.log('req.body register', req.body);
  if (user) {
    res.json({
      type: false,
      data: "User already exists!"
    });
  } else {

    var newUser = {
      "id": Math.random(),
      "username": req.body.username,
      "email": req.body.email,
      "login": req.body.login,
      "password": req.body.password,
      "dateOfRegistration": moment().format('MMMM Do YYYY, h:mm:ss a'),
      "isAdmin": false,
      "orders": [],
      "wishes": [],
      "lastOrderData": 0,
      "sumOrdersCost": 0

    };

    var payload = {id: newUser.id};// Полезная нагрузка
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    users.push(newUser);

    writeToFs('users', users);


    res.json(
      {
        type: true,
        username: newUser.username,
        token: token
      })

  }
});

// Secret page route
app.get("/me", passport.authenticate('jwt', {session: false}), function (req, res) {

  res.json({
    type: true,
    username: req.user.username,
    wishes: req.user.wishes,
    dateOfRegistration: req.user.dateOfRegistration,
    isAdmin: req.user.isAdmin,
    lastOrderData: req.user.lastOrderData,
    sumOrdersCost: req.user.sumOrdersCost


  })


});
// Secret page- user info change route
app.put("/me", passport.authenticate('jwt', {session: false}), function (req, res) {

  console.log('req ', req.body);
  var user = users[_.findIndex(users, {id: req.user.id})];
  var isPasswordEqualToCurrent, isPasswordEqualBetween, type;
  // проверить совпадают ли пароли, и различаются ли старый и измененный
  if (req.body.password !== user.password) {
    isPasswordEqualToCurrent = false;
    type = false;

  } else if (req.body.newPassword === user.password) {
    isPasswordEqualBetween = false;
    type = false;
  } else {
    user.password = req.body.newPassword;
    user.username = req.body.username;
    isPasswordEqualToCurrent= true;
    isPasswordEqualBetween= true;
    type = true;

    writeToFs('users', users);
  }
  res.json({
    type: type,
    isPasswordEqualToCurrent: isPasswordEqualToCurrent ,
    isPasswordEqualToLast: isPasswordEqualBetween
  });




});

// Secret page route
app.post("/me", passport.authenticate('jwt', {session: false}), function (req, res) {
  var user = users[_.findIndex(users, {id: req.user.id})];
  user.wishes.push(req.body);
  writeToFs('users', users);


  console.log('req', req);
  // users[user]['wishes'].push()
  res.send("Got  a post request - add to your wishes ", req);
});


// Secret page route
app.post("/me/orders", passport.authenticate('jwt', {session: false}), function (req, res) {
  var user = users[_.findIndex(users, {id: req.user.id})];


  var sum = req.body.reduce((prev, curr) => {
    return prev + (curr.cost * curr.quantity);
  }, 0);
  user.lastOrderData = moment().format('MMMM Do YYYY, h:mm:ss a');
  user.sumOrdersCost += sum;

  // For understanding sum of money and time of purchase
  req.body.push(moment().format('MMMM Do YYYY, h:mm:ss a'));
  req.body.push(sum);
  user.orders.push(req.body);

  writeToFs('users', users);

  res.send('Got a post request. Please wait for calling... ');

});

function writeToFs(model, data) {
  var string = JSON.stringify(data);
  fs.readFile('./mongoModels/' + model + '.json', 'utf8', function (err, contents) {
    console.log(contents);
  });
  fs.writeFile(__dirname + "/mongoModels/" + model + '.json', string, 'utf8', function (err) {
    if (err) return console.error(err);
    console.log('done');
  });
}


app.listen(8080, function () {
  console.log('Your app listening on port 8080!');
});
