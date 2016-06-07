
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');

var logger=console;

var router = express();
var server = http.createServer(router);

module.exports=Server;

function Server() {

    router.get('/data/(.+)',(req,res) => {
       var entity=req.params[0].toString();
       var query=req.query;
       var retval={id:1,...query};
       if(entity.endsWith('s'))
       	retval = [{id:1,...query},{id:2,...query},{id:3,...query}];
	   response = JSON.stringify(retval);
       res.send(response);
    });
    router.post('/data/(.+)',(req,res) => {
       var entity=req.params[0].toString();
	   response = req.body;
       res.send(response);
    });
    
    router.delete('/data/(.+)',(req,res) => {
       var entity=req.params[0].toString();
	   response = req.body;
       res.send(response);
    });
    
    server.listen(3000,"localhost",511);
    logger.log("server started");
    return this;
};
