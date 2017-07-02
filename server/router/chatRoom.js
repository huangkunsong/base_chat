/**
 * Created by rookie on 2017/6/18.
 * All copyright belongs to rookie.
 */
const router = require("express").Router();
const ChatRoomDao = require("../mongoDB/chatRoomDao");
const Logger = require("../middleware/log4js");

router.get("/findTopChatRoom", function (request, response) {
    ChatRoomDao.findTopChatRoom().then(function (result){
        response.json(result);
    }).catch(function (e) {
        Logger.error(e);
        response.state(500);
    });
});

router.post("/createChatRoom", function (request, response) {
    request.body.author = request.session.user.nickName;
    ChatRoomDao.createChatRoom(request.body).then(function (){
        response.end("create success");
    });
});

module.exports = router;
