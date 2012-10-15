#!/usr/bin/env node

var Metric = require('./Metric.js').createMetric();
var options = require('./Options.js');
var colors = require('colors');
var util = require('util');
options.process();
var StressTest = require('./BeloolaTesting.js').createBeloolaTesting();

if(!options.get('numberUser')){
	options.help();
} else if(options.get('moveUserOnly') && options.get('teleportMove')) {  
    var m = options.get('moveUserOnly');
    var t = options.get('teleportMove');

    if(m==="true" && t==="true") {
        options.help();
    }
    
    if((m) && (m!=="true") && (m!=="false")) {
        options.help();
    } else if((t) && (t!=="true") && (t!=="false")) {
       options.help(); 
    }
} else if(options.get('moveUserOnly')){
    var m = options.get('moveUserOnly');
    
    if((m) && (m!=="true") && (m!=="false")) {
        options.help();
    }
} else if(options.get('teleportMove')){
    var t = options.get('teleportMove');
    
    if((t) && (t!=="true") && (t!=="false")) {
        options.help();
    }
 
}

// Configuration du test avec les données utilisateurs
StressTest.config(
    options.get('numberUser'),
    options.get('moveUserOnly'),
    options.get('teleportMove')
);

// Lancement du test
Metric.setStartTime();
StressTest.start();

// Mise en place de l'interface utilisateur \o/ L O L
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
    console.log('  Temps du test    : '.grey.bold + Metric.getLatency());
    console.log("---------------------------------------------------------------------------".green.bold);

    process.exit(0);
});
