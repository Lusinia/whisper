import { AccessToken, User } from '../mongoModels';
import { SECRET } from '../helpers/constants';
import * as jwt from 'jsonwebtoken';

const mongoose = require('mongoose');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const bearerStrategy = require('passport-http-bearer').Strategy;
const keys = require('../config/keys');

// const token = jwt.sign({login:'testUser', password: 'test'}, 'supersecret',{expiresIn: 4000});

mongoose.connect(keys.keys.mongoURI);

const db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback() {
    console.info("Connected to DB!");
});

// passport encode user id from mongo to cookie
// passport.serializeUser((user, done) => {
//     console.log('user', user.id);
//     process.nextTick(() => {
//         done(null, user.id); // user.id is shortcut of _id from mongo
//     })
// });
// // passport receive cookies and decode
// // them to id to find current user from mongo
// passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//         process.nextTick(() => {
//             done(null, user);
//         })
//     })
// });
// https://console.developers.google.com
passport.use(
    new googleStrategy({
        clientID: 'keys.googleClientID',
        clientSecret: keys.googleClientSecret,
        // callbackURL: '/auth/google/callback',
        proxy: true,
        callbackURL: keys.googleRedirectURI  //   or we can add  proxy: true  to use http everywhere
    }, (accessToken, refreshToken, profile, done) => {
        console.log('here', accessToken);
        console.log('keys', keys)
        User.findOne({userId: profile.id}).then(existingUser => {
            if (existingUser) {
                // User exists!
                done(null, existingUser); // errorMessage, user
            } else {
                new User({userId: profile.id})
                    .save()
                    .then(user => done(null, user));
            }
        });
    }));


passport.use(new bearerStrategy(
    async (accessToken, done) => {
        try {
            console.log('accessToken', accessToken);
            const token = jwt.decode(accessToken);

            const userToken = await AccessToken.findOne({token: accessToken});
            if (userToken) {
                const existingUser = await User.findById(userToken.userId);
                console.log('user exists bearerStrategy', existingUser.login);
                return  existingUser ? done(null, existingUser) :  done(null, false);
            } else {
                return done(null, false);
            }
        } catch (err) {
            console.log(err)
        }
    })
);

/*
 try {
        const user = req.body;

        const newToken = jwt.sign({email: user.email, password: user.password}, SECRET, {expiresIn: 40000});
        const existingUser = await User.findOne({email: user.email});

        if (existingUser) {
            res.json(existingUser);
        } else {
            res.send('User is\'t exist');
        }
    } catch (err) {
        console.log('err', err);
    }
 */

export { passport };
// export default passport;
/*
passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));
 */
// passport.use(
//     new FacebookStrategy({
//         clientID: keys.facebookClientID,
//         clientSecret: keys.facebookClientSecret,
//         callbackURL: keys.facebookRedirectUri,
//         profileFields: ['email'],
//         // enableProof: true
//         // callbackURL: keys.googleRedirectURI  //   or we can add  proxy: true  to use http everywhere
//     }, (accessToken, refreshToken, profile, done) => {
//         console.log('facebook', accessToken);
//         User.findOne({userId: profile.id}).then(existingUser => {
//             if (existingUser) {
//                 // User exists!
//                 done(null, existingUser); // errorMessage, user
//             } else {
//                 new User({userId: profile.id})
//                     .save()
//                     .then(user => done(null, user));
//             }
//         });
//     }));
//
