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

            parseDomain.getGames("file_to_parse/games.log", function (err, data) {

                if (err) {
                    requestHelper.error(err, 400);
                } else {
                    requestHelper.success(data, 200);
                }
            });
        },

        getGameReportByIndex: function (req, res) {

            requestHelper.setResponse(res);
            var notificacao = req.body;
            var id = req.params.id;

            parseDomain.getGames("file_to_parse/games.log", function (err, data) {

                if (err) {
                    requestHelper.error(err, 400);
                } else {

                    var index = data.map(function (elem) { return parseInt(elem.id); }).indexOf(parseInt(id));

                    if (index === -1) {
                        requestHelper.error({ message : "Game not found."}, 404);
                    } else {
                        requestHelper.success(data[index], 200);
                    }
                }
            });
        },
    };

    return gameReportController;
};