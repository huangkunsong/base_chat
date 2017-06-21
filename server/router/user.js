/**
 * Created by Huangkunsong on 2017/6/6.
 */
const express = require("express");
const UserDao = require("../mongoDB/userDao");

const Router = express.Router();

Router.post("/register", function (request, response) {
    const UserVO = request.body;
    UserDao.registerUser(UserVO).then(function (){
        response.end("register success");
    }).catch(function (e) {
        response.end(e);
    });
});

Router.get("/register", function (request, response) {
    return response.render("register");
});

module.exports = Router;
