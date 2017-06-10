/**
 * Created by Huangkunsong on 2017/6/8.
 */
const express = require("express");
const router = express.Router();

/**
 * homeRouter,请求数据库获取数据
 * userRouter,注册登录
 * chatRouter,聊天相关
 **/
router.get("/", function (request, response) {
    return response.render("login", {
        chatRoomList : [{roomName : "asdddddddasd"}, {roomName : "asdasdd"}],
    });
});

module.exports = router;
