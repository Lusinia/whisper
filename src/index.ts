
import { ChatServer } from './chat-server';

let app = new ChatServer().getApp();

/*

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./mongoModels/User');
require('./sockets/passport');



mongoose.connect(keys.mongoURI);

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('X-HTTP-Method-Override', 'DELETE');
  res.header('X-HTTP-Method-Override', 'PUT');
  next();
});

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, // 30 days in milliseconds
        keys: [keys.cookieKey] // like secret for encode cookie
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/layoutRoutes')(app);
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=937658150853-eacl7gv5qe9qi19qqbjs7r5fk76vb2qe.apps.googleusercontent.com
 */
export { app };
