/**
 * Created by rookie on 2017/6/10.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const UserModel = require("./Models/UserModel");

UserModel.register({
    userName : "张",
    account : "li",
    a : 123,
    password : "123123",
});

UserModel.findOneUser({
    userName : "张",
}, function (data) {
    if (data) {
        data.accountUserName = "asdasda asdasasd";
        console.info(data.toJSON({virtuals : true}));
        console.info(data.accountUserName);
    }
});
