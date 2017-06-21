/**
 * Created by rookie on 2017/6/10.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const mongoose = require("./connection");
const Logger = require("../middleware/log4js");
const UserSchame = require("./Schame/userSchame");

const UserModel = mongoose.model("User", UserSchame);

function registerUser (userVO){
    return checkUserExists(userVO.account).then(function () {
        return UserModel.create(userVO);
    }).then(function (){
        Logger.info(`User ${userVO.account} register success.`);
    });
}

function loginUser (userVO){
    return UserModel.findOne(userVO).then(function (result){
        if (!result){
            return Promise.reject("The user name or password error.");
        }
        return result ;
    });
}

function checkUserExists (account){
    if (account) {
        return UserModel.findOne({account}).then((userVO) => {
            if (userVO) {
                const msg = "User already exists.";
                Logger.warn(msg);
                return Promise.reject(msg);
            }
        });
    } else {
        return Promise.reject("User Account is Null");
    }
}

module.exports = {
    registerUser,
    loginUser,
};
