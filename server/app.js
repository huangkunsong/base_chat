/**
 * Created by Huangkunsong on 2017/6/6.
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// eslint-disable-next-line no-unused-vars
const log = require("./middleware/log");

/**user,chat**/

const app = express();

app.use(express.static(path.join(__dirname, "../static")));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));
/*app.use(log);
*
* homeRouter,请求数据库获取数据
* userRouter,注册登录
* chatRouter,聊天相关*/
app.get("/", function (request, response) {
    return response.render("login", {
        chatRoomList : [{roomName : "asdasd"}, {roomName : "asdasdd"}]
    });
});

app.listen(80);

