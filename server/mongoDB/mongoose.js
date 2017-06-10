/**
 * Created by rookie on 2017/6/10.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost/chat";

mongoose.connection(dbUrl);

mongoose.connection.on("connected", function () {

});

