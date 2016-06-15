
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');

var Configuration = require("./configuration");
var MCCMod = require("./model/mccodes")

var config = new Configuration();
var mcc = new MCCMod()


var logger=console;

var router = express();
var server = http.createServer(router);


module.exports=Server;

//console.log(mcc.codes)

function Server() {

    router.get('/dictionaries/mcc/:start',function(req,res) {
       var start=req.params.start.toString();
       retval = mcc.codes.filter(function(code) {return code.mcc.indexOf(start)==0})
       response = JSON.stringify(retval);
       res.send(response);
    });
    router.get('/dictionaries/mccodes',function(req,res) {
        res.send(JSON.stringify(mcc.codes));
    })
    
    
    
    server.listen(config.Web.port,config.Web.hostname,511,this.onlistening());
    this.httpserver=server;
    logger.log("current HTTP config:"+JSON.stringify(config.Web));
    
    this.servicesinited=0;
    return this;
};


Server.prototype.stopserver=function() { 
    try {
    this.wsserver.terminate();this.httpserver.close();
    } catch(err) {
        console.log(err);
    }
}

Server.prototype.initcomplete=function () {};

Server.prototype.onlistening = function() {
    var self=this;
    return function() {
        if(++self.servicesinited>1)
            self.initcomplete();
    }
}

