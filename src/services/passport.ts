const passport = require('passport');
import  GoogleStrategy from 'passport-google-oauth20';
import  FacebookStrategy from 'passport-facebook';
import  mongoose from 'mongoose';

const googleStrategy = GoogleStrategy.Strategy;
const facebookStrategy = FacebookStrategy.Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

// passport encode user id from mongo to cookie
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user.id); // user.id is shortcut of _id from mongo
  })
});
// passport receive cookies and decode
// them to id to find current user from mongo
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    process.nextTick(() => {
      done(null, user);
    })
  })
});
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
    User.findOne({ userId: profile.id }).then(existingUser => {
      if (existingUser) {
        // User exists!
        done(null, existingUser); // errorMessage, user
      } else {
        new User({ userId: profile.id })
          .save()
          .then(user => done(null, user));
      }
    });
  }));

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
