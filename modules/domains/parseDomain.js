/***
 * @author Cleber Fonseca
 * @date 19/06/17.
 */
module.exports = function (app) {

    var fs = require('fs');

    var parseDomain = {

        readFile: function (path, callback) {
            fs.exists(path, function(exists) {
                console.log(exists);
                if (exists) {
                    callback(null);
                } else {
                    callback("Arquivo não localizado");
                }
            });
        }
    };

    return parseDomain;
};