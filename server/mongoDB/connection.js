/**
 * Created by rookie on 2017/6/10.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const mongoose = require("mongoose");
const Logger = require("../middleware/log4js");

mongoose.Promise = Promise;
const dbUrl = "mongodb://localhost/chat";

mongoose.connect(dbUrl, {
    config : {
        //禁止创建索引,直接创建索引会有性能影响,索引创建不是并行执行
        autoIndex : true,
    },
});
const db = mongoose.connection;
db.on("connected", function () {
    Logger.info("Mongoose connection to " + dbUrl);
});

db.on("error", function (error) {
    Logger.info("Mongoose connection to " + error);
});

db.on("disconnected", function () {
    Logger.info("Mongoose disconnected");
});

module.exports = mongoose;

