/*jslint node: true, white: false, continue: true, passfail: false, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var http = require('http');
var async = require('async');
var mysql = require("mysql");

var config = require('./config.js');
var utils = require('./util.js');

var toolHandlers = [require('./loc_loader.js').handleRequest]

function handleRequest(request, response){
    "use strict";
    var handled = false;
    var respStr = "";
    var url = request.url;
    console.log("requested: " + url);
    
    var requestContext = {request : request, response : response, url : url};
    for (var i = 0; i < toolHandlers.length; i++) {
       if (toolHandlers[i](requestContext)){
           handled = true;
           break;
       }
    }
    if (!handled){
        utils.returnUnknownRequest(request, response, url);
    }
}


http.createServer(function (request, response) {
    handleRequest(request, response);
}).listen(config.port, config.listen_ip);
console.log('Server running at http://127.0.0.1:1337/');
