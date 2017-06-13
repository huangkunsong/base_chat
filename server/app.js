/**
 * Created by rookie on 2017/6/7
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Logger = require("./middleware/log4js");

const loginRouter = require("./router/login");

const app = express();

Logger.connectLogger(app);
app.use(express.static(path.join(__dirname, "../static")));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));

app.use("/", loginRouter);

app.listen(80);

