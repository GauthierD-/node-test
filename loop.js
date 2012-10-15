////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//  Loop execute pour la simulation des utilisateurs.                         //
//  La simulation se fait avec socket.io-client.                              //
//  mon socket client genere les evenements et le serveur reagit              //
//  en consequence. Voir le fichier Beloola/www_dyn/web/js/connection.js      //
//  pour voir tous les evenements qui peuvent etre rajoutes.                  //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

"use strict";
var io = require('socket.io-client'); 
var socket = io.connect('https://localhost:8333/');
socket.on("latencyRecup", function(data){
    var t2 = new Date().getTime();
    var t1 = data.time;
    console.log("Latence du serveur : " + t2-t1);
});
/*
* Objet que athos recoit (user de test: Gauthier Deroo)
* clientObject = {
*       id:         109,
*       userName:   'sna',
*       firstName:  'Gauthier',
*       step:       '3',
*       cookie: '8lcnibggkbmk32ne2gde8tokh4'
*   }
*/

var self = this;
var mydata = {
	id          : 109,
    userName    : "sna",
    firstName   : "Gauthier",
    step        : "3",
    cookie      : "stressing", // permet de ne pas s'identifier sur le serveur. (auth.js)
    hostUserId  : 0,
    worldid     : 0,
    animNumber  : 1
}

//connection server
process.nextTick(function() {
    socket.emit('auth.connect', mydata);    
});

// creation du monde
process.nextTick(function() {
    socket.emit('world.createworld', mydata);    
});

//createion Avatar
process.nextTick(function() {
    socket.emit('avatar.createavatar', mydata);    
});
    
//animation avatar
process.nextTick(function() {
    socket.emit('avatar.animate', mydata);
});    
//Move avatar with quat and Vec3 
process.nextTick(function(){
    var orientation = {
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
    mydata.orientation = orientation;
    mydata.position = position;
    mydata.velocity = velocity;
    socket.emit("avatar.move", mydata);
});

process.nextTick(function() {
    socket.emit("avatar.move", mydata);    
});
process.nextTick(function() {
    socket.emit("avatar.move", mydata);    
});
process.nextTick(function() {
    socket.emit("avatar.move", mydata);    
});
process.nextTick(function() {
    socket.emit("avatar.move", mydata);    
});
process.nextTick(function() {
    socket.emit("avatar.move", mydata);    
});
process.nextTick(function() {
    socket.emit("avatar.move", mydata);    
});

//teleport avatarToHome
process.nextTick(function() {
    socket.emit("avatar.teleportToHome", mydata);    
});

//teleport avatar
process.nextTick(function() {
    socket.emit("avatar.teleport", mydata)    
});

// getFriends
process.nextTick(function() {
    socket.emit("friends.send", mydata);
});

// getConversation
process.nextTick(function() {
    socket.emit("mail.sendConversations", mydata);    
});

//GetOneMail
process.nextTick(function() {
    mydata.conversationId = 1;
    socket.emit("mail.sendMails", mydata);
});

//ReadMail
process.nextTick(function() {
    socket.emit("mail.read", mydata);
})

// openchatnofriend
process.nextTick(function() {
    mydata.userid = 109;
    socket.emit("chat.openchatnofriend", mydata);
});

//mailsearch
process.nextTick(function() {
    mydata.keyword = "toto";
    socket.emit("mail.search", mydata);
});

//sendMail
process.nextTick(function() {
    mydata.content = "blablablabla";
    mydata.previous = 0;
    mydata.usertoArray = [109];
    socket.emit("mail.transmit", mydata);
});

process.nextTick(function() {
    var latencyPacket = {};
    latencyPacket.data = "azertyuiopqsdfghjklmwxcvbn";
    latencyPacket.time = new Date().getTime();

    socket.emit("latencySend", latencyPacket);
});

process.nextTick(function() {
    socket.emit("disconnect");
});

