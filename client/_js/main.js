"use strict";

var ws = null;
var newMsg = "";
var chatContent = "";
var username = null;
var joined = false;

var packet;

function created() {
    ws = new WebSocket("ws://" + "131.151.90.241:10000" + "/ws")
    ws.addEventListener("message", function(e) {
        var msg = JSON.parse(e.data);
        if (msg.chat) {
            var msgNode = document.createTextNode(msg.message);
            var msgPara = document.createElement("p");
            msgPara.appendChild(msgNode);
            msgPara.setAttribute("class", "talktext");
            var newClientMsg = document.createElement("div");
            newClientMsg.setAttribute("class", "talk-bubble tri-right left-top");
            newClientMsg.appendChild(msgPara)
            var chatList = document.getElementById("chat__list");
            chatList.appendChild(newClientMsg);
        } else {
            packet = msg;
        }
    });
}

function send() {
    
    if (newMsg != "") {
        //placeMessageInDiv();
        //changeSize();
        ws.send(
            JSON.stringify({
                username: username,
                message: newMsg
            }));
        newMsg = "";
        document.getElementById("chat__message").value = "";
        updateScroll();
    }
}

function join() {
    if (!username) {
        console.log("You must choose a username");
        return;
    }
    username = $("<p>").html(username).text();
    joined = true;
}

var submitButton = document.getElementById("chat__send");
submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (submitButton.innerHTML != "Send") {
        username = document.getElementById("chat__message").value;
        join();
        submitButton.innerHTML = "Send";
    } else {
        newMsg = document.getElementById("chat__message").value;
        send();
    }
    return false;
}, true);

function updateScroll(){
    var element = document.getElementById("chat__back");
    element.scrollTop = element.scrollHeight - element.clientHeight;
}

created();

var pong = document.getElementById("pong");
var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;

if(h >= w && 2/3 * h <= w) {
    pong.style.width = 2/3 * h + "px";
    pong.style.height = pong.style.height;
} else if(2/3 * h >= w && h >= w) {
    pong.style.height = w + "px";
    pong.style.width = pong.style.height
} else if(2/3 * w > h) {
    pong.style.width = h + "px";
    pong.style.height = pong.style.width;
} else {
    pong.style.height = 2/3 * w + "px";
    pong.style.width = pong.style.height;
}