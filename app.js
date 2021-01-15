'use strict';

var express = require('express'),
    path = require('path'),
    app = express();

var dbConnector = require('./lib/helpers/database.helper');

dbConnector.init(app);
var router = require('./lib/routes');
//Map the Routes
router.init(app);


module.exports = app;
