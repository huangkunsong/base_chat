/**
 * Created by rookie on 2017/6/18.
 * All copyright belongs to rookie.
 */
const moogoose = require("./connection");
const Logger = require("../middleware/log4js");
const chatRoomSchame = require("./Schame/chatRoomSchame");

const ChatRoomModel = moogoose.model("chatRoom", chatRoomSchame);

function createChatRoom (chatRoomVO) {
    return ChatRoomModel.create(chatRoomVO).then(function (){
        Logger.info(`Create chat room ${chatRoomVO.chatRoomName} success.`);
    });
}

function findTopChatRoom (limit = 50){
    return ChatRoomModel.find({}).sort("-createdAt").limit(limit);
}

module.exports = {
    createChatRoom,
    findTopChatRoom,
};
