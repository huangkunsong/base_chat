/**
 * Created by rookie on 2017/6/9.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const mongoose = require("../connection");
const Schema = mongoose.Schema;
const Logger = require("../../middleware/log4js");

/**
 * 创建一个Schema,类似VO
 * UserSchame.methods设置model的实例方法
 * UserSchame.statics设置model的静态方法
 */
const UserSchame = new Schema({
    userId : Number,
    account : String,
    password : String,
    //设置别名,数据库使用name,model中使用userName
    name : {
        type : String,
        alias : "userName",
        default : "aaa" //默认值
    },
}, {
    autoIndex : false,
    //bufferCommands : true, //断开连接时,重新连接之前,mongoose会缓存命令
    //capped : 1024, //设置查询结果集最大大小,字节单位,可以是对象:需要明确指定size
    collection : "users", //设置model对应的集合名,在model中设置时会自动转为复数
    emitIndexErrors : false, //创建索引时报错将触发model上的index事件,设置为true将触发error事件
    _id : true, //保存文档不会自动添加_id列,只可以用在子文档中
    id : false, //获取数据时mongoose会自动为每个文档设置一个虚拟id,设置false不会设置id
    minimize : false, //默认true,查询数据时默认会过滤空对象查询,false保持空对象查询
    //strict : "throw", //默认true,设置为true,非Schame定义的字段无法插入mongodb中,设置throw会报错处理
    toJSON : {
        minimize : true, //默认true,删除空对象
        retainKeyOrder : false, // 默认false,设置true保持对象的顺序
        virtuals : true, //输出含虚拟属性,会覆盖getters的配置
        getters : true, //输出所有字段,包含虚拟字段
// eslint-disable-next-line space-before-function-paren,no-empty-function
        transform : function(){}, //转换之前触发
    },
    //toObject : {} 与toJSON一致
    typeKey : "type", //设置属性类型时会使用type指定类型,但type有时有别的用处时,可以使用该字段定义type的字段
    versionKey : "__v", //创建时每个文档会自动添加一个__v字段,指明版本,可以修改该字段名
    timestamps : true, //时间戳,会自动添加createdAt,updatedAt字段为date类型。保存和更新时会自动赋值。自定义可以设置为 { timestamps: { createdAt: 'created_at' } }
});

/**
 * 设置虚拟属性,不会被存入mongodb,
 * 但model实例可以正常使用
 * JSON.stringify,或者toJSON,toObject不会有虚拟属性
 * 传参{virtuals : true} 可以输出虚拟属性
 *
 */
UserSchame.virtual("accountUserName").get(function () {
    return this.account + " " + this.userName;
}).set(function (value) {
    const values = value.split(" ");
    this.account = values[0];
    this.userName = values[1];
});

/**
 * _id无法创建稀疏索引,此处会报错。
 */
/*UserSchame.index({_id : 1}, {
    sparse : true,  //创建稀疏索引,只包含索引字段的文档的条目
});*/

UserSchame.index({name : 1});

/**
 * 扩展Model的实例方法
 */
/*Object.assign(UserSchame.methods, {

});*/

/**
 * 扩展Model的静态方法,需要在model之前
 */
Object.assign(UserSchame.statics, {

    /**
     * 注册一个用户
     * @param userVO
     * @param callback
     */
    register : function (userVO, callback) {
        
        /**
         * 根据集合实例出文档,一个文档即表中的一条数据
         * 可以传递第二个参数覆盖Schame中定义的strict
         */
        const UserVO = new UserModel(userVO);
        UserVO.save().then(callback).catch(function (error) {
            Logger.error(error);
        });
    },
    
    /**
     * 查找一个用户
     */
    findOneUser : function (userVO, callback) {
        UserModel.findOne(userVO).then(callback).catch(function (error) {
            Logger.error(error);
        });
    },
    
});

/**
 * 指定Schame对应的表,表名会自动加上s后缀
 * UserModel对应集合
 */
const UserModel = mongoose.model("users", UserSchame);

/**
 * 创建索引失败时将触发model上的index事件
 */
/*UserModel.on("index", function (error) {
    console.error(error);
});*/

UserModel.ensureIndexes(function (){
    console.log(arguments);
});

module.exports = UserModel;

