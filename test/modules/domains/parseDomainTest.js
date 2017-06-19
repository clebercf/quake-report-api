"use strict";

/***
 * @author Cleber Fonseca
 * @date 19/06/17.
 */
describe("Testa o parseDomain", function() {

    var app;
    var should;
    var parseDomain;
    var config;
    var sinon;
    this.timeout(10000);

    before(function(done) {

        process.env.NODE_ENV = 'test';

        app = require('../../../app');

        parseDomain = app.modules.domains.parseDomain;

        should = require('should');
        config = require('config');
        sinon = require('sinon');

        done();
    });

    it("Deveria falhar ao tentar ler um arquivo que não existe", function(done) {
        parseDomain.readFile("invalido", function(err) {
            (err === "Arquivo não localizado").should.be.true();
            done();
        });
    });

    it("Deveria executar a leitura do arquivo e retornar o array com as linhas", function(done) {
        parseDomain.readFile("file_to_parse/games.log", function(err) {
            (err === null).should.be.true();
            done();
        });
    });

});
