
var exports;
var config = require('./config.js');

exports.returnUnknownRequest = function(request, response, url) {
	"use strict";
	console.log('Unknown request: '  + url);
	response.statusCode = 405;
	response.end();
}
