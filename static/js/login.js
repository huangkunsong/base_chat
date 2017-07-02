/**
 * Created by Huangkunsong on 2017/6/6.
 */
require.config({
    baseUrl : "statics/js/lib",
    paths : {
        jquery : "jquery-3.1.1",
        socketIO : "/socket.io/socket.io",
    },
});

define(["jquery", "socketIO"], function ($, SocketIO) {
    let userName = getCookie("userName");
    const socketIO = SocketIO.connect("http://localhost");
    if (!userName) {
        $("#loginForm").show();
        $("#register").click(function () {
            window.location.href = "/user/register";
        });
        $("#submit").click(function () {
            $.ajax({
                type : "POST",
                data : $("#loginForm").serialize(),
                url : "/",
                dataType : "json",
            }).then(function (data) {
                if (data.message) {
                    $("#message").text(data.message);
                } else {
                    userName = getCookie("userName") || "";
                    loadTopChatRoom();
                    $("#message").text(`Welcome,${userName}`);
                    $("#loginForm").hide();
                    $("#loginAfter").show();
                }
            });
        });
    } else {
        $("#loginAfter").show();
        $("#message").text(`Welcome,${userName}`);
        $("#loginForm").hide();
        $("#createChatRoom").click(function () {
            $("#newChatRoom").show();
        });
        $("#cancalChatRoom").click(function () {
            $("#chatRoomReset").click();
            $("#newChatRoom").hide();
        });
        $("#chatRoomSubmit").click(function () {
            $.ajax({
                type : "POST",
                url : "/chat/createChatRoom",
                data : $("#chatRoom").serialize(),
            }).then(function (result) {
                loadTopChatRoom();
                $("#chatRoomReset").click();
                $("#newChatRoom").hide();
            });
        });
    }
    loadTopChatRoom();
    
    function loadMyChatRoom (){
        $.ajax({
            type : "GET",
            url : "/chat/findTopChatRoom",
        }).then(function (result){
            console.log(result);
        });
    }
    
    function loadTopChatRoom (){
        $.ajax({
            type : "GET",
            url : "/chat/findTopChatRoom",
            dataType : "json",
        }).then(function (result){
            const chat = $("#chatRoomList");
            chat.empty();
            $.each(result, function (index, item){
                const name = $("<div class='chatRoomName' />").text(item.chatRoomName);
                const desc = $("<div class='desc' />").text(item.description);
                const author = $("<div class='author'/>").text(`author : ${item.author || "anonymity"}`).attr("title", item.author);
                const count = $("<div class='count' />").text(`Persion : ${item.count}`);
                const chatRoom = $("<div class='item' />").append(name).append(desc).append(author).append(count);
                if (userName) {
                    chatRoom.click(joinChatRoom.bind(chatRoom, item._id));
                }
                chat.append(chatRoom);
            });
        });
    }
    
    function getCookie (objName) {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] === objName) {
                return decodeURIComponent(temp[1]);
            }
        }
    }
    function joinChatRoom (id){
        socketIO.emit("joinChat", id, function (){
            console.log(arguments);
        });
    }
    
    socketIO.on("message", function (message) {
        console.log(message);
    });
    
});
