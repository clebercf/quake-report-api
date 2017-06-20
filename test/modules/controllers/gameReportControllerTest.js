"use strict";

/***
 * @author Cleber Fonseca
 * @date 20/06/17.
 */
describe("Testa o gameReportController", function () {

    var app;
    var request;
    var should;
    var config;
    var parseDomain;
    var sinon;

    this.timeout(4000);

    before(function (done) {

        process.env.NODE_ENV = 'test';

        app = require('../../../app');
        request = require('supertest')(app);
        should = require('should');
        config = require('config');
        sinon = require('sinon');

        parseDomain = app.modules.domains.parseDomain;
        done();
    });

    it("Deveria retornar uma lista de games", function (done) {

        var stubDomain = sinon.sandbox.create().stub(parseDomain, 'getGames', function (path, callback) {
            return callback(null, [{
                id: 1,
                total_kills: 0,
                players: ['Isgalamido'],
                kills: { 'Isgalamido': 0 }
            },
            {
                id: 2,
                total_kills: 11,
                players: ['Isgalamido', 'Dono da Bola', 'Mocinha'],
                kills: { 'Isgalamido': -9, 'Dono da Bola': 0, 'Mocinha': 0 }
            },
            {
                id: 3,
                total_kills: 4,
                players: ['Dono da Bola', 'Mocinha', 'Isgalamido', 'Zeh'],
                kills: { 'Dono da Bola': -1, 'Mocinha': 0, 'Isgalamido': 1, 'Zeh': -2 }
            }]
            );
        });

        request.get('/api/' + config.apiVersion + '/games')
            .expect(200)
            .end(function (err, res) {
                (res.body.length === 3).should.be.true();
                stubDomain.restore();
                done();
        });
    });

    it("Deveria não retornar uma lista de games, quando o método que executa o parser do arquivo falhar", function (done) {
        var stubDomain = sinon.sandbox.create().stub(parseDomain, 'getGames', function (path, callback) {
            return callback("error");
        });

        request.get('/api/' + config.apiVersion + '/games')
            .expect(400)
            .end(function (err, res) {
                (res.statusCode === 400).should.be.true();
                stubDomain.restore();
                done();
        });
    });
});