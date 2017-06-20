/***
 * @author Cleber Fonseca
 * @date 19/06/17.
 */
module.exports = function (app) {

    var fs = require('fs');

    var parseDomain = {

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

        _initGame: function (line, callback) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(InitGame)\\w*";
            var aReturn = line.match(regex);
            callback((Array.isArray(aReturn) === true));
        },

        _endGame: function (line, callback) {
            var regex = "\\s*\\d{1,2}:\\d{2}\\s*(ShutdownGame)\\w*";
            var aReturn = line.match(regex);
            callback((Array.isArray(aReturn) === true));
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
        }
    };

    return parseDomain;
};