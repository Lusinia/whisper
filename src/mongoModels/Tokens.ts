// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const {Schema} = mongoose;

const AccessTokenSchema = new Schema({
    userId: String,
    clientId: String,
    token: String,
    created: { type: Date, default: Date.now }
});

const RefreshTokenSchema = new Schema({
    userId: String,
    clientId: String,
    token: String,
    created: { type: Date, default: Date.now }
});


const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
const AccessToken = mongoose.model('AccessToken', AccessTokenSchema);

export { AccessToken, RefreshToken };

