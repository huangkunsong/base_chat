/**
 * Created by rookie on 2017/6/18.
 * All copyright belongs to rookie.
 */
require.config({
    baseUrl : "/statics/js/lib",
    paths : {
        jquery : "jquery-3.1.1",
    },
});

define(["jquery"], function ($) {
    $("#submit").on("click", function () {
        $.ajax({
            type : "POST",
            url : "/user/register",
            data : $("#registerForm").serialize(),
        }).then(function (result) {
            if (result && result.indexOf("success") !== -1){
                let count = 3;
                setInterval(function () {
                    count--;
                    if (!count){
                        return window.location.href = "/";
                    }
                    $("#message").text(result + "...." + count);
                }, 1000);
            } else {
                $("#message").text(result);
            }
        });
    });
    
    document.querySelector("#chatRoomList")
});
