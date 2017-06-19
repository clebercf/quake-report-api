var express = require('express');
var consign = require('consign');
var config = require('config');

var app = express();
consign()
    .then('modules/helpers')
    .then('modules/models')
    .then('modules/domains')
    .then('modules/controllers')
    .then('routes')
    .into(app);

const server = app.listen((process.env.PORT === undefined ? config.apiPort : process.env.PORT), function() {
    console.log("API Quake Log Iniciado na porta: " + (process.env.PORT === undefined ? config.apiPort : process.env.PORT));
});

module.exports = app;