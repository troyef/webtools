var exports;

var mysql = require("mysql");
var fs = require('fs');

var config = require('./config.js');
var utils = require('./util.js')

var connection = mysql.createConnection({
   host: config.dbserver,
   user: config.dbuser,
   password: config.dbpass,
   database: config.dbName
});

function loadLocaterScripts(requestContext){
    "use strict";
    var acctId = requestContext.url.substring(9,requestContext.url.length - 3);
    fs.readFile('./scripts/locator.js','utf8',function(error,rsp){
        //check error
        rsp = rsp.replace("{ACCT_ID}",acctId);
        rsp = rsp.replace("{G_API_KEY}",config.gApiKey);
        //rsp = rsp.replace("{G_MAP_SENSOR}","false");
        rsp = rsp.replace("{LOCATOR_STYLES}",fs.readFileSync('./css/locator.css','utf8'));
        
        connection.query('SELECT * FROM locations', function (error, rows) {
            //check error
            //console.log(JSON.stringify(rows));
            connection.end();
            
            rsp = rsp.replace("{LOCATION_DATA}",JSON.stringify(rows));
            
            requestContext.response.writeHead(200, {'Content-Type': 'application/javascript'});
            requestContext.response.end(rsp);
        });
        
        
    });
    
    
    return true;
    
}


exports.handleRequest = function (requestContext) {
    var handled = false;
    console.log(requestContext.url.substring(1,8));
    if (requestContext.url.substring(1,8) != "locator"){
        return false;
    } else {
        handled = loadLocaterScripts(requestContext);
    }
    if (!handled){
        utils.returnUnknownRequest(request, response, url);
    }
    return true;
}