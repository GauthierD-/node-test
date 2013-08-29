/*
 * Loop.js, this file is use for simulate user on your server. 
 * Client is simulate with socket-io.client and use event.
 *
 */

"use strict";
var io = require('socket.io-client'); 
var socket = io.connect('https://localhost:8333/');
var self = this;
var mydata = {
	id          : 1,
    userName    : "innie",
    firstName   : "minnie",
    hack        : "stressing", // for me this, allow me to connect on my server 
}

//connect server
process.nextTick(function() {
    socket.emit('connect', mydata);    
});

//Move user 
process.nextTick(function(){
    var move = {
        s   :   0.9108,
        x   :   0.4128,
        y   :   0,
        z   :   0
    };
    var position = {
        x   :   0.2065,
        y   :   0.8323,
        z   :   0.0449
    };
    var velocity = {
        x   :   0,
        y   :   0,
        z   :   0
    };
    mydata.position = position;
    mydata.velocity = velocity;
    socket.emit("move", mydata);
});

// getMailUser
process.nextTick(function() {
    socket.emit("mailsUser", mydata);    
});

// GetOneMail
process.nextTick(function() {
    mydata.conversationId = 1;
    socket.emit("oneMail", mydata);
});

// Search Mail
process.nextTick(function() {
    mydata.keyword = "yumyum";
    socket.emit("findMail", mydata);
});

//sendMail
process.nextTick(function() {
    mydata.content = "blablablabla";
    mydata.previous = 0;
    mydata.usertoArray = [2];
    socket.emit("sendMail", mydata);
});
/* Only For me =)
 *
process.nextTick(function() {
    var latencyPacket = {};
    latencyPacket.data = "azertyuiopqsdfghjklmwxcvbn";
    latencyPacket.time = new Date().getTime();

    socket.emit("latency", latencyPacket);
});
 *
 */

// etc ... 

process.nextTick(function() {
    socket.emit("disconnect");
});

