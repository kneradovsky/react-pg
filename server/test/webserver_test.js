var should = require("should");
var request = require("supertest");
var fs = require("fs");

var Configuration = require("../lib/configuration.js");
var config=new Configuration();

var req = request("http://localhost:"+config.Web.port);

var testserver=null;

describe('test web server',function() {

    beforeEach(function(done) {
        var count=0;
        var testget=function() {
            req.get('/').end(function(err,res) {
               if(err) {
                   console.log(err);
                   
                   if(++count<5) 
                    setTimeout(testget,1000); //wait 1 second before next attempt
                    else
                        done();
                } 
                else done();
                count.should.be.lessThan(5);
            });
        };
        testget();
    });

     it('test_inexistent_route',function(done) {
         req.post('/').send(JSON.stringify({data:'a'})).expect(404,done);
     });
     
     it('test codes, empty data ',function(done) {
        req.get('/dictionaries/mcc/').expect(404,done);
     });

     it('test codes, one char',function(done) {
        var data = req.get('/dictionaries/mcc/7').expect(200).end(function(err,res) {
            if(err) return done(err);
            JSON.parse(res.text)
            .filter(function(code) {return code.mcc[0]!='7';})
            .length.should.be.exactly(0);
            done();
        });
     });
     it('test codes, two chars',function(done) {
        req.get('/dictionaries/mcc/75').expect(200).end(function(err,res) {
            if(err) return done(err);
            JSON.parse(res.text)
            .filter(function(code) {return (code.mcc[0]!='7' && code.mcc[1]!='5')})
            .length.should.be.exactly(0);
            done();
        });
     });
     it('test codes, three chars',function(done) {
        req.get('/dictionaries/mcc/753').expect(200).end(function(err,res) {
            if(err) return done(err);
            JSON.parse(res.text)
            .filter(function(code) {(code.mcc[0]!='7' && code.mcc[1]!='5' && code.mcc[1]!='7')})
            .length.should.be.exactly(0);
            done();
        });
     });
     it('test codes, exact code',function(done) {
        req.get('/dictionaries/mcc/9211').expect(200).end(function(err,res) {
            if(err) return done(err);
            JSON.parse(res.text)
            .length.should.be.exactly(1);
            done();
        });
     });


});

