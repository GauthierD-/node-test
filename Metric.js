//
//
// Metrics.js - all metrics of the host machine 
//
//
exports = module.exports = Metric;
var os = require('os');

function Metric() {
	"use strict";
	this.memTotal = null;
	this.memUse = null;
	this.memUsePercent = null;
	this.cpuUsage = null;
	this.startTime = null;
	this.latency = null;
}

Metric.prototype.getMemTotal = function() { 
	"use strict";
	return (os.totalmem()/1000000000).toFixed(2) + ' GB';
};

Metric.prototype.getMemUse = function() {
	"use strict";
	var memTotal = (os.totalmem()/1000000000).toFixed(2);
	var memLibre = (os.freemem()/1000000000).toFixed(2);
	var memUse = (memTotal - memLibre).toFixed(2);
    return memUse + ' GB';
};

Metric.prototype.getMemUsePercent = function() {
	"use strict";
    var memTotal = (os.totalmem()/1000000000).toFixed(2);
	var memLibre = (os.freemem()/1000000000).toFixed(2);
	var memUse = (memTotal - memLibre).toFixed(2);
    var percent = (memUse / memTotal) * 100;
    return Math.round(percent) + ' %';
};

Metric.prototype.getCpuUsage = function() {
	"use strict";
	var loadCPU = os.loadavg();
	return loadCPU;
};

Metric.prototype.setStartTime = function() {
	"use strict";
	this.startTime = new Date().getTime();
};

Metric.prototype.getTimeTest = function() {
	"use strict";
	var latency = new Date().getTime() - this.startTime;
	return latency + ' ms';
};

// Me permet de récupérer l'objet Métric
// possible grace a cette ligne
// exports = module.exports = Metric;
exports.createMetric = function(){
	"use strict";
	var Self = this;
	return new Self();
};
