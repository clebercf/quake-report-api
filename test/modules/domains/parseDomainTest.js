/***
 * @author Cleber Fonseca
 * @date 19/06/17.
 */
describe("Testa o parseDomain", function () {

    var app;
    var should;
    var parseDomain;
    var config;
    var sinon;
    this.timeout(10000);

    var initGameLine = '  0:00 InitGame: \sv_floodProtect\1\sv_maxPing\0\sv_minPing\0\sv_maxRate\10000\sv_minRate\0\sv_hostname\Code Miner Server\g_gametype\0\sv_privateClients\2\sv_maxclients\16\sv_allowDownload\0\dmflags\0\fraglimit\20\timelimit\15\g_maxGameClients\0\capturelimit\8\version\ioq3 1.36 linux-x86_64 Apr 12 2009\protocol\68\mapname\q3dm17\gamename\baseq3\g_needpass\0';
    var endGameLine = '  1:47 ShutdownGame:';
    var killEvent = '  1:11 Kill: 1022 4 19: <world> killed Isgalamido by MOD_FALLING';
    var clientEvent = '  1:02 ClientUserinfoChanged: 7 n\Mal\t\2\model\james\hmodel\*james\g_redteam\\g_blueteam\\c1\4\c2\5\hc\100\w\0\l\0\tt\0\tl\0';

    before(function (done) {

        process.env.NODE_ENV = 'test';
        app = require('../../../app');
        parseDomain = app.modules.domains.parseDomain;
        should = require('should');
        config = require('config');
        sinon = require('sinon');

        done();
    });

    it("Deveria listar a lista de games", function (done) {
        parseDomain.getGames("file_to_parse/games_teste.log", function (err, games) {
            (Array.isArray(games)).should.be.true();
            (games.length === 4).should.be.true();
            done();
        });
    });

    it("Deveria falhar ao tentar ler um arquivo que não existe", function (done) {
        parseDomain._readFile("invalido", function (err, lines) {
            (err === "Arquivo não localizado").should.be.true();
            done();
        });
    });

    it("Deveria executar a leitura do arquivo e retornar o array com as linhas", function (done) {
        parseDomain._readFile("file_to_parse/games.log", function (err, lines) {
            (err === null).should.be.true();
            (Array.isArray(lines) === true).should.be.true();
            done();
        });
    });

    it("Deveria indicar que iniciou o jogo", function (done) {
        var ret = parseDomain._initGame(initGameLine);
        (ret === true).should.be.true();
        done();
    });

    it("Deveria indicar que não iniciou o jogo, ao informar um evento de kill", function (done) {
        var ret = parseDomain._initGame(killEvent);
        (ret === false).should.be.true();
        done();
    });

    it("Deveria indicar que não iniciou o jogo, ao informar um evento do jogador", function (done) {
        var ret = parseDomain._initGame(clientEvent);
        (ret === false).should.be.true();
        done();
    });

    it("Deveria indicar que não iniciou o jogo, ao informar um evento de fim do jogo", function (done) {
        var ret = parseDomain._initGame(endGameLine);
        (ret === false).should.be.true();
        done();
    });

    it("Deveria indicar que finalizou o jogo", function (done) {
        var ret = parseDomain._endGame(endGameLine);
        (ret === true).should.be.true();
        done();
    });

    it("Deveria indicar que não finalizou o jogo, ao informar um evento de kill", function (done) {
        var ret = parseDomain._endGame(killEvent);
        (ret === false).should.be.true();
        done();
    });

    it("Deveria indicar que não finalizou o jogo, ao informar um evento do jogador", function (done) {
        var ret = parseDomain._endGame(clientEvent);
        (ret === false).should.be.true();
        done();
    });

    it("Deveria indicar que não finalizou o jogo, ao informar um evento de início de jogo", function (done) {
        var ret = parseDomain._endGame(initGameLine);
        (ret === false).should.be.true();
        done();
    });

    it("Deveria indicar que houve uma morte no jogo", function (done) {
        parseDomain._killEvent(killEvent, function (match) {
            (match === true).should.be.true();
            done();
        });
    });

    it("Deveria indicar que não houve uma morte no jogo, ao informar um evento de fim de jogo", function (done) {
        parseDomain._killEvent(endGameLine, function (match) {
            (match === false).should.be.true();
            done();
        });
    });

    it("Deveria indicar que não houve uma morte no jogo, ao informar um evento do jogador", function (done) {
        parseDomain._killEvent(clientEvent, function (match) {
            (match === false).should.be.true();
            done();
        });
    });

    it("Deveria indicar que não houve uma morte no jogo, ao informar um evento de início de jogo", function (done) {
        parseDomain._killEvent(initGameLine, function (match) {
            (match === false).should.be.true();
            done();
        });
    });

    it("Deveria indicar que houve um evento de jogador", function (done) {
        parseDomain._clientEvent(clientEvent, function (match) {
            (match === true).should.be.true();
            done();
        });
    });

    it("Deveria indicar que não houve um evento de jogador, ao informar um evento de fim de jogo", function (done) {
        parseDomain._clientEvent(endGameLine, function (match) {
            (match === false).should.be.true();
            done();
        });
    });

    it("Deveria indicar que não houve um evento de jogador, ao informar um evento de kill", function (done) {
        parseDomain._clientEvent(killEvent, function (match) {
            (match === false).should.be.true();
            done();
        });
    });

    it("Deveria indicar que não houve um evento de jogador, ao informar um evento de início de jogo", function (done) {
        parseDomain._clientEvent(initGameLine, function (match) {
            (match === false).should.be.true();
            done();
        });
    });

});
