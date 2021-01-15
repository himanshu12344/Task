(function (appllicationRoutes) {

    'use strict';

    appllicationRoutes.init = function (app) {

        var fileUploadRoute = require('./file.upload');
        app.use('/api', fileUploadRoute);

    };
})(module.exports);