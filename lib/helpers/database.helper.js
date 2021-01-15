(function (databaseHelper) {

    'use strict';

    var dbConfig = require('../config/database.config'),
        mongoose = require('mongoose');

    databaseHelper.init = function (app) {
        var dbUrl = '',
        dbUrl = "mongodb://" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName;
        mongoose.connect(dbUrl);

        var db = mongoose.connection;

        db.on('connected', function () {
            console.log('Mongoose default connection open to ' + dbUrl);
        });

        // When the connection is disconnected
        db.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        // If the connection throws an error
        db.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    };

})(module.exports);
