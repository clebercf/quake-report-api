"use strict";

/***
 * @author Cleber Fonseca
 * @date 20/06/17.
 */
describe("Testa o requestHelper", function(){

    var app;
    var request;
    var should;
    var requestHelper;
    var httpMock;
    var response;
    var config;

    before(function(done){

        process.env.NODE_ENV = 'test';

        app = require('../../../app');
        should = require('should');
        httpMock = require('node-mocks-http');
        config = require('config');

        request = httpMock.createRequest({
            method: 'GET',
            url: '/',
            params: {
                id: 42
            }
        });
        response = httpMock.createResponse();
        requestHelper = app.modules.helpers.requestHelper;
        requestHelper.setResponse(response);

        done();
    });

    it("Deveria testar o setResponse", function(done){
        (requestHelper._res !== null).should.be.true();
        done();
    });

    it("Deveria testar se o setResponse foi adicionado", function(done){
        (typeof requestHelper._res.send === 'function').should.be.true();
        requestHelper._res.send({});
        done();
    });

    it("Deveria testar o sucesso setando o status 200 ", function(done){

        requestHelper.success({}, 200);
        done();
    });

    it("Deveria testar o erro setando o status 500 ", function(done){

        requestHelper.error({}, 500);
        done();
    });

    it("Deveria testar o sucesso setando o status 200 sem setar o 200 ", function(done){

        requestHelper.success({});
        done();
    });

    it("Deveria testar o erro setando o status 500 sem setar o 200", function(done){

        requestHelper.error({});
        done();
    });


});
