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
                        if (game === null) {
                            game = {
                                total_kills: 0,
                                players: [],
                                kills: {}
                            };
                        } else {
                            aGames.push(game);
                        }
                    } else if (_self._endGame(line) === true) {
                        aGames.push(game);
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

        _clientEvent: function (line, callback) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(ClientUserinfoChanged)\\w*";
            var aReturn = line.match(regex);
            callback((Array.isArray(aReturn) === true));
        },

        _endGame: function (line) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(ShutdownGame)\\w*";
            return Array.isArray(line.match(regex));
        }
    };

    return parseDomain;
};