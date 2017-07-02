/**
 * Created by rookie on 2017/7/2.
 * All copyright belongs to rookie.
 */
const socketIO = require("socket.io");
const http = require("http");
const Logger = require("./middleware/log4js");

module.exports = function listenSocket (app){
    const server = http.createServer(app);
    const rooms = {};
    
    server.listen(80);
    const io = socketIO.listen(server);
    
    io.on("connection", function (socket) {
        Logger.socket("Socket connection success, Socket : " + socket);
        
        socket.on("joinChat", function (data, callback) {
            let room = rooms[data] || (rooms[data] = []);
            if (!~room.indexOf(socket)) {
                room.push(socket);
            }
            callback(room.length);
        });
        
        setInterval(function () {
            socket.emit("message", {asda : "asdasd"});
        }, 5000);
    });
};
