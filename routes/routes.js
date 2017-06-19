module.exports = function(app) {

    var config = require('config');

    app.get('/api/version', function(req, res) {
        res.status(200).send({
            app: "Quake Report API",
            version: 'v1.0.0',
            enviroment: process.env.NODE_ENV
        });
    });

};