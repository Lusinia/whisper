// prod.js - productions keys here

export const keys = {
    googleClientID: process.env['GOOGLE_CLIENT_ID'],
    googleClientSecret:  process.env['GOOGLE_CLIENT_SECRET'],
    // googleRedirectURI: 'https://desolate-reaches-72653.herokuapp.com/auth/google/callback',
    googleRedirectURI: ' https://git.heroku.com/boogy-blog.git/auth/google/callback',
    facebookClientID: process.env['FACEBOOK_CLIENT_ID'],
    facebookClientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    facebookRedirectUri: ' https://git.heroku.com/boogy-blog.git/auth-service/facebook/callback',
    // facebookRedirectUri: 'https://desolate-reaches-72653.herokuapp.com/auth/facebook/callback',
    mongoURI: process.env['MONGO_URI'],
    cookieKey:  process.env['COOKIE_KEY'],
    tokenLife : 3600,
    cloudinaryName: 'dryurfzs6',
    cloudinaryAPIKey: 833837335482648,
    cloudinaryAPISecret: 'p12vxdKvvtWOVmD61yhHu3-FjXo',
    cloudinaryEnv: '//833837335482648:p12vxdKvvtWOVmD61yhHu3-FjXo@dryurfzs6/'
};