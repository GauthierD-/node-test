//
//
// Objet de test qui configure le stressTest et lance le test
// grace a la méthode .start().
//
//
exports = module.exports = BeloolaTesting;
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var clusterMaster = require('cluster-master');
var io = require('socket.io-client'); 
var Metric = require('./Metric.js').createMetric();


function BeloolaTesting() {
    "use strict";
    EventEmitter.call(this);
    this.numberUser = null,
    this.moveUserOnly= null,
    this.teleportMove = null; 
}

// l'objet beloolaTesting hérite de EventEmitter
util.inherits(BeloolaTesting, EventEmitter);

BeloolaTesting.prototype.setNumberUser = function(numberUser) {
    "use strict";
    if(numberUser === undefined) {
        this.numberUser = 5;    
    } else {
        this.numberUser = numberUser;
    }
};

BeloolaTesting.prototype.setBoolMoveUserOnly = function(moveUserOnly) {
    "use strict";
    if(moveUserOnly === undefined) {
        this.moveUserOnly = false;    
    } else {
        this.moveUserOnly = moveUserOnly;
    }
};

BeloolaTesting.prototype.setBoolTeleportMove = function(teleportMove) {
    "use strict";
    if(teleportMove === undefined) {
        this.teleportMove = false;    
    } else {
        this.teleportMove = teleportMove;
    }
};

//Configuration de l'objet BeloolaTesting
BeloolaTesting.prototype.config = function(numberUser, moveUserOnly, teleportMove) {
    "use strict";
    var self = this;
    this.setNumberUser(numberUser);
    this.setBoolMoveUserOnly(moveUserOnly);
    this.setBoolTeleportMove(teleportMove);
    self.colorWelcome();
};

BeloolaTesting.prototype.start = function() {
    "use strict";
    var self = this;
    var nameLoop = null;

    if(this.moveUserOnly === 'true') {
        nameLoop = "loopMove.js";
    } else if(this.teleportMove === 'true') {
        nameLoop = "loopTeleportMove.js";
    } else {
        nameLoop = "loop.js";
    }

    self.update();
    clusterMaster({
        exec: nameLoop,
        size: this.numberUser 
    });
    clusterMaster.quit();
};

BeloolaTesting.prototype.update = function() {
    "use strict";
    var self = this;
    process.nextTick(function() {
        self.emit('update');
    })
};

BeloolaTesting.prototype.exit = function() {
    "use strict";
    var self = this;
    
    process.nextTick(function() {
        self.emit('exit');
    });
};

BeloolaTesting.prototype.colorWelcome = function() {
    "use strict";
    var self = this;
    process.nextTick(function() {
        self.emit('colorWelcome');
    });
};

exports.createBeloolaTesting = function(){
    "use strict";
    var Self = this;
    return new Self();
};
