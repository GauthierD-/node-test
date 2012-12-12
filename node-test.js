#!/usr/bin/env node

var Metric = require('./Metric.js').createMetric();
var options = require('./Options.js');
var colors = require('colors');
var util = require('util');
options.process();
var StressTest = require('./ServerTesting.js').createServerTesting();

if(!options.get('numberUser')){
	options.help();
} else if(options.get('yourLoop2') && options.get('yourLoop3')) {  
    var m = options.get('yourLoop2');
    var t = options.get('yourLoop3');

    if(m==="true" && t==="true") {
        options.help();
    }
    
    if((m) && (m!=="true") && (m!=="false")) {
        options.help();
    } else if((t) && (t!=="true") && (t!=="false")) {
       options.help(); 
    }
} else if(options.get('yourLoop2')){
    var m = options.get('yourLoop2');
    
    if((m) && (m!=="true") && (m!=="false")) {
        options.help();
    }
} else if(options.get('yourLoop3')){
    var t = options.get('yourLoop3');
    
    if((t) && (t!=="true") && (t!=="false")) {
        options.help();
    }
 
}

// Configuration user 
StressTest.config(
    options.get('numberUser'),
    options.get('yourLoop2'),
    options.get('yourLoop3')
);

// test start
Metric.setStartTime();
StressTest.start();

// User Interface \o/ 
StressTest.on('colorWelcome', function(){

var welcomeMessage = [
'    #####                                       #######                     ', 
'   #     # ##### #####  ######  ####   ####        #    ######  ####  ##### ',
'   #         #   #    # #      #      #            #    #      #        #   ',
'    #####    #   #    # #####   ####   ####        #    #####   ####    #   ',
'         #   #   #####  #           #      #       #    #           #   #   ',
'   #     #   #   #   #  #      #    # #    #       #    #      #    #   #   ',
'    #####    #   #    # ######  ####   ####        #    ######  ####    #   ',
].join('\n');

util.puts(welcomeMessage.rainbow.bold);

});

// APRES JE CHANGE TOUT METRICS DE LA MACHINE HOTE USELESS
// ON NEED LES METRICS DU SERVER ATTAQU2 ET PAS LA NOTRE ! USELESS BOY

// display metrics computer host
StressTest.on('update', function() {
    "use strict";
    console.log('\n\n');
    console.log("------------------------    Update des Metrics    -------------------------".blue.bold);
    console.log('  CPU load Average : '.grey.bold + Metric.getCpuUsage());
    console.log('  Memory use       : '.grey.bold + Metric.getMemUse());
    console.log('  % Memory         : '.grey.bold + Metric.getMemUsePercent());
    console.log("---------------------------------------------------------------------------".blue.bold);
});

// metrics at the end of test 
process.on('exit', function() {
    "use strict";
    console.log('\n\n');
    console.log("------------------------    Fin du StressTest    --------------------------".green.bold);
    console.log('  CPU load Average : '.grey.bold + Metric.getCpuUsage()) ; 
    console.log('  Memory use       : '.grey.bold + Metric.getMemUse());
    console.log('  % Memory:        : '.grey.bold + Metric.getMemUsePercent());
    console.log('  Temps du test    : '.grey.bold + Metric.getTimeTest());
    console.log("---------------------------------------------------------------------------".green.bold);

    process.exit(0);
});
