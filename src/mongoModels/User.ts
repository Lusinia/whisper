import * as crypto from 'crypto';
import moment = require('moment');
import { DATE_FORMAT } from '../helpers/constants';
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    userId: String,
    login: String,
    username: String,
    email: String,
    dateOfRegistration: { type: Date, default: moment().format(DATE_FORMAT) },
    password: String,
    isAdmin:  { type: Boolean, default: false },
    orders:  { type: Array, default: [] },
    wishes: { type: Array, default: [] },
    imageURL: String
});


const User = mongoose.model('users', userSchema);

export { User };