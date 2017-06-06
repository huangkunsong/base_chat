/**
 * Created by Huangkunsong on 2017/6/6.
 */
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

function generatorFileName (time, index = 1){
    time = time || new Date();
    const month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    const day = pad(time.getDate());
    const hour = pad(time.getHours());
    const minute = pad(time.getMinutes());
    
    return month + "/" + month +
            day + "-" + hour + minute + "-" + index + "-file.log";
}

function pad (num) {
    return (num > 9 ? "" : "0") + num ;
}

const stream = rfs(generatorFileName, {
    size : "10M",
    interval : "1d",
    compress : "gzip",
    path : path.join(__dirname, "../log"),
});

module.exports = morgan("combined", {stream : stream}) ;
