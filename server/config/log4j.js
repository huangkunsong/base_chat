const path = require("path");
const log4jConfig = function (basePath = __dirname, level = "DEBUG") {
    return {
        appenders : [
            {type : "console", category : "console"},
            {
                type : "dateFile",
                alwaysIncludePattern : true,
                filename : path.join(basePath, "info/"),
                pattern : "yyyyMMddhh.log",
                category : "info",
            },
            {
                type : "dateFile",
                alwaysIncludePattern : true,
                filename : path.join(basePath, "/debug/"),
                pattern : "yyyyMMddhh.log",
                category : "debug",
            },
            {
                type : "dateFile",
                alwaysIncludePattern : true,
                filename : path.join(basePath, "warn/"),
                pattern : "yyyyMMddhh.log",
                category : "warn",
            },
            {
                type : "dateFile",
                alwaysIncludePattern : true,
                filename : path.join(basePath, "error/"),
                pattern : "yyyyMMddhh.log",
                category : "error",
            },
            //存放除HTTP请求的所有日志
            {
                type : "dateFile",
                alwaysIncludePattern : true,
                filename : path.join(basePath, "root/"),
                pattern : "yyyyMMddhh.log",
                category : "root",
            },
            //存放http请求日志
            {
                type : "dateFile",
                alwaysIncludePattern : true,
                filename : path.join(basePath, "request/"),
                pattern : "yyyyMMddhh.log",
                category : "request",
            },
        ],
        //设置替换console中各种日志方法
        replaceConsole : true,
        levels : {
            //设置日记记录的级别
            "[all]" : level,
        },
    };
};
module.exports = log4jConfig;
