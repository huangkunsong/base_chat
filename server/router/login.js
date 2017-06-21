/**
 * Created by Huangkunsong on 2017/6/8.
 */
const express = require("express");
const router = express.Router();
const UserDao = require("../mongoDB/userDao");

/**
 * homeRouter,请求数据库获取数据
 * userRouter,注册登录
 * chatRouter,聊天相关
 **/
router.get("/", function (request, response) {
    response.render("login");
});

router.post("/", function (request, response) {
    const user = request.body;
    if (!user.account){
        response.end("Please enter account.");
    } else if (!user.passWord){
        response.end("Please enter password.");
    }
    UserDao.loginUser(request.body).then(function (userVO) {
        request.session.user = userVO;
        response.cookie("userName", userVO.nickName);
        response.json(userVO);
    }).catch(function (e) {
        e = typeof e === "string" ? e : e.message;
        response.json({message : e});
    });
});

module.exports = router;
