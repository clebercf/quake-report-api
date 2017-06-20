"use strict";

/***
 * @author Cleber Fonseca
 * @date 20/06/17.
 */
module.exports = function (app) {

    var parseDomain = app.modules.domains.parseDomain;

    var requestHelper = app.modules.helpers.requestHelper;

    var gameReportController = {

        getGamesReport: function (req, res) {

            requestHelper.setResponse(res);
            var notificacao = req.body;

            parseDomain.getGames("file_to_parse/games_teste.log", function (err, data) {

                if (err) {
                    requestHelper.error(err, 400);
                } else {
                    requestHelper.success(data, 200);
                }
            });
        }
    };

    return gameReportController;
};