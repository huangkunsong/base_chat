/**
 * Created by rookie on 2017/6/7
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Logger = require("./middleware/log4js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const socketIO = require("./socket");

const index = require("./router/login");
const user = require("./router/user");
const chatRoom = require("./router/chatRoom");

const app = express();


Logger.connectLogger(app);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));

app.use(session({
    secret : "mima",
}));
app.use("/statics", express.static(path.join(__dirname, "../static")));
app.use("/", index);

app.use("/user", user);
app.use("/chat", chatRoom);

socketIO(app);


