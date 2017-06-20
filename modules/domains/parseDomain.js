/***
 * @author Cleber Fonseca
 * @date 19/06/17.
 */
module.exports = function (app) {

    var fs = require('fs');

    var parseDomain = {

        getGames: function (path, callback) {

            var _self = this;

            _self._readFile(path, function (err, aLines) {
                if (err) callback(err);

                var aGames = [];
                var game = null;

                aLines.forEach(function (line) {

                    if (_self._initGame(line) === true) {
                        // inicio de jogo
                        if (game !== null) {
                            aGames.push(game);
                            game = null;
                        }
                        game = {
                            id: (aGames.length + 1),
                            total_kills: 0,
                            players: [],
                            kills: {}
                        };
                    } else if (_self._clientEvent(line) === true) {
                        // o jogador entrou no game
                        var arr = line.split("\\");

                        if (game.players.indexOf(arr[1]) === -1) {
                            game.players.push(arr[1]);
                            game.kills['' + arr[1] + ''] = 0;
                        }

                    } else if (_self._endGame(line) === true) {
                        // Fim de jogo
                        aGames.push(game);
                        game = null;
                    }
                });

                callback(null, aGames);
            });
        },

        _readFile: function (path, callback) {
            fs.exists(path, function (exists) {
                if (exists) {
                    fs.readFile(path, 'utf8', function (err, data) {
                        if (err) callback(err);
                        var lines = data.split(/\r?\n/);
                        callback(err, lines);
                    });
                } else {
                    callback("Arquivo não localizado");
                }
            });
        },

        _initGame: function (line) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(InitGame)\\w*";
            return Array.isArray(line.match(regex));
        },

        _killEvent: function (line, callback) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(Kill)\\w*";
            var aReturn = line.match(regex);
            callback((Array.isArray(aReturn) === true));
        },

        _clientEvent: function (line) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(ClientUserinfoChanged)\\w*";
            return Array.isArray(line.match(regex));
        },

        _endGame: function (line) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(ShutdownGame)\\w*";
            return Array.isArray(line.match(regex));
        }
    };

    return parseDomain;
};