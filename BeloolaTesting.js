//
//
// this object is config with the choose of user for the test
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
    this.yourLoop2= null,
    this.yourLoop3 = null; 
}

util.inherits(BeloolaTesting, EventEmitter);

BeloolaTesting.prototype.setNumberUser = function(numberUser) {
    "use strict";
    if(numberUser === undefined) {
        this.numberUser = 5;    
    } else {
        this.numberUser = numberUser;
    }
};

BeloolaTesting.prototype.setBoolyourLoop2 = function(yourLoop2) {
    "use strict";
    if(yourLoop2 === undefined) {
        this.yourLoop2 = false;    
    } else {
        this.yourLoop2 = yourLoop2;
    }
};

BeloolaTesting.prototype.setBoolyourLoop3 = function(yourLoop3) {
    "use strict";
    if(yourLoop3 === undefined) {
        this.yourLoop3 = false;    
    } else {
        this.yourLoop3 = yourLoop3;
    }
};

// Object configuration
BeloolaTesting.prototype.config = function(numberUser, yourLoop2, yourLoop3) {
    "use strict";
    var self = this;
    this.setNumberUser(numberUser);
    this.setBoolyourLoop2(yourLoop2);
    this.setBoolyourLoop3(yourLoop3);
    self.colorWelcome();
};

// Launch the test on server
BeloolaTesting.prototype.start = function() {
    "use strict";
    var self = this;
    var nameLoop = null;

    if(this.yourLoop2 === 'true') {
        nameLoop = "loop2.js";
    } else if(this.yourLoop3 === 'true') {
        nameLoop = "loop3.js";
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
