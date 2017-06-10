const path = require("path");


const LOG4J_CONFIG = {
    appenders : [
        {type : "console", category : "console"},
        {
            type : "dateFile",
            alwaysIncludePattern : true,
            filename : path.join(__dirname, "../logs/info/"),
            pattern : "yyyyMMddhh.log",
            category : "info",
        },
        {
            type : "dateFile",
            alwaysIncludePattern : true,
            filename : path.join(__dirname, "../logs/debug/"),
            pattern : "yyyyMMddhh.log",
            category : "debug",
        },
        {
            type : "dateFile",
            alwaysIncludePattern : true,
            filename : path.join(__dirname, "../logs/warn/"),
            pattern : "yyyyMMddhh.log",
            category : "warn",
        },
        {
            type : "dateFile",
            alwaysIncludePattern : true,
            filename : path.join(__dirname, "../logs/error/"),
            pattern : "yyyyMMddhh.log",
            category : "error",
        },
        //存放除HTTP请求的所有日志
        {
            type : "dateFile",
            alwaysIncludePattern : true,
            filename : path.join(__dirname, "../logs/root/"),
            pattern : "yyyyMMddhh.log",
            category : "root",
        },
        //存放http请求日志
        {
            type : "dateFile",
            alwaysIncludePattern : true,
            filename : path.join(__dirname, "../logs/request/"),
            pattern : "yyyyMMddhh.log",
            category : "request",
        },
    ],
    //设置替换console中各种日志方法
    replaceConsole : true,
    levels : {
        //设置日记记录的级别
        "[all]" : "DEBUG",
    },
};

module.exports = LOG4J_CONFIG;
