/**
 * Created by rookie on 2017/6/18.
 * All copyright belongs to rookie.
 */
const mongoose = require("../connection");
const Schema = mongoose.Schema;
const UserSchame = require("./userSchame");

const ChatRoomSchame = new Schema({
    chatRoomName : {
        type : String,
        unique : true,
    },
    count : {
        type : Number,
        default : 1,
    },
    description : String,
    users : [UserSchame],
    author : String,
}, {
    autoIndex : false,
    collection : "chatRoom", //设置model对应的集合名,在model中设置时会自动转为复数
    strict : "throw", //默认true,设置为true,非Schame定义的字段无法插入mongodb中,设置throw会报错处理
    timestamps : true,
});

module.exports = ChatRoomSchame;
