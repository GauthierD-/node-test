/*
 * 
    Options.js, it's here for the config user
 *
 */

var optparse = require('optparse');
var util = require('util');


var Options = {
	numberUser: undefined,
	yourLoop2: undefined,
	teleportMove: undefined //method FromSenderToAll() dans server.js
};

var switches = [
	['-n', '--numberUser NUMBER', 'Numbers of client while the stressTest'],
	['-m', '--yourLoop2 BOOLEAN', 'Default: false'],
	['-t', '--teleportMove BOOLEAN', 'This loop simulate teleport & move avatar. Default: false\n']
];

var parser;

var help = exports.help = function(){
	"use strict";
	util.log(parser);
	process.exit();
};

var parser = new optparse.OptionParser(switches);
parser.banner = 'stressTest.js [options] only one Boolean arguments must to set at true' 

parser.on('help', function() {
	"use strict";
	help();
});

parser.on('numberUser', function(opt, value){
	"use strict";
	Options.numberUser = Number(value);
});

parser.on('yourLoop2', function(opt, value){
	"use strict";
	Options.yourLoop2 = String(value);
});

parser.on('teleportMove', function(opt, value){
	"use strict";
	Options.teleportMove = String(value);
});

exports.get = function(option){
	"use strict";
	return Options[option];
};

exports.process = function(){
	"use strict";
	parser.parse(process.argv);
};
