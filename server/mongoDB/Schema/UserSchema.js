/**
 * Created by rookie on 2017/6/9.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const UserSchame = new Schema({
    userId : Number,
    account : String,
    password : String,
    userName : String,
});

module.exports = UserSchame;
