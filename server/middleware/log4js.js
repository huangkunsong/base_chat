/**
 * Created by rookie on 2017/6/10.
 * All copyright belongs to rookie.
 * A learning to program a rookie.
 * github : https://github.com/huangkunsong
 */
const log4js = require("log4js");
const path = require("path");
const log4jConfig = require("../config/log4j");

log4js.configure(log4jConfig(path.join(__dirname, "../logs")));

const root = log4js.getLogger("root");
const console = log4js.getLogger("console");
const request = log4js.getLogger("request");

/**
 * 封装日记记录到文件时,将记录信息打印到控制台和root日志文件
 * @param level 日志级别
 * @returns {Function}  日志记录方法
 */
function proxy (level) {
    return function (...args){
        log4js.getLogger(level)[level](...args);
        root[level](...args);
        console[level](...args);
    };
}

const Logger = {
    debug : proxy("debug"),
    info : proxy("info"),
    warn : proxy("warn"),
    error : proxy("error"),
    connectLogger : function (app, level = "info", consoleOutput = false) {
        if (consoleOutput) {
            (function (request) {
                const oldLog = request.log;
                request.log = (...args) => {
                    const message = args[args.length - 1];
                    console[level](message);
                    oldLog.call(request, ...args);
                };
            }(request));
        }
        app.use(log4js.connectLogger(request, {
            level,
            //定制日志格式
            /*format : ":method"*/
        }));
    },
};

module.exports = Logger;
