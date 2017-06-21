/**
 * Created by rookie on 2017/6/9.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const mongoose = require("../connection");
const Schema = mongoose.Schema;

/**
 * 创建一个Schema,类似VO
 * UserSchame.methods设置model的实例方法
 * UserSchame.statics设置model的静态方法
 */
const UserSchame = new Schema({
    account : String,
    passWord : String,
    nickName : String,
}, {
    autoIndex : false,
    collection : "users", //设置model对应的集合名,在model中设置时会自动转为复数
    strict : "throw", //默认true,设置为true,非Schame定义的字段无法插入mongodb中,设置throw会报错处理
    timestamps : true, //时间戳,会自动添加createdAt,updatedAt字段为date类型。保存和更新时会自动赋值。自定义可以设置为 { timestamps: { createdAt: 'created_at' } }
});

module.exports = UserSchame;

