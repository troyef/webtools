/*jslint node: true, white: false, continue: true, passfail: false, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
"use strict";

var http = require('http');
var async = require('async');
var mysql = require("mysql");

var locatr = require("./locatr");


var config = require('./config.js');

function handleRequest(request, response){
    "use strict";
    
    var respStr = "";
    var url = request.url;
    console.log("requested: " + url);
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    console.log(url.substring(1,8));
    if (url.substring(1,8) == "locater"){
        respStr += 'document.write("locater")';
    } else {
        respStr += 'document.write("not")';
    }
    
    response.end(respStr);
    
    
    
}


http.createServer(function (request, response) {
    handleRequest(request, response);
}).listen(config.port, config.listen_ip);
console.log('Server running at http://127.0.0.1:1337/');
