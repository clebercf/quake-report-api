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
                            game.players.push('' + arr[1] + '');
                            game.kills['' + arr[1] + ''] = 0;
                        }

                    } else if (_self._killEvent(line) === true) {
                        // evento de morte
                        var ret = _self._parseKillEvent(line);

                        if (ret.firstPlayer.toUpperCase() === "<WORLD>") {
                            game.kills['' + ret.secondPlayer + ''] = game.kills['' + ret.secondPlayer + ''] - 1;
                        } else {
                            if (ret.firstPlayer.toUpperCase() === ret.secondPlayer.toUpperCase()) {
                                game.kills['' + ret.firstPlayer + ''] = game.kills['' + ret.firstPlayer + ''] - 1;
                            } else {
                                game.kills['' + ret.firstPlayer + ''] = game.kills['' + ret.firstPlayer + ''] + 1;
                            }
                        }

                        game.total_kills = game.total_kills + 1;

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

        _killEvent: function (line) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(Kill)\\w*";
            return Array.isArray(line.match(regex));
        },

        _parseKillEvent: function (line) {
            var arr = line.split("killed");
            var aFirstPlayer = arr[0].split(":");
            var firstPlayer = aFirstPlayer[aFirstPlayer.length - 1].trim();

            var aSecondPlayer = arr[1].split("by");
            var secondPlayer = aSecondPlayer[0].trim();

            return {
                'firstPlayer': firstPlayer,
                'secondPlayer': secondPlayer
            };
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