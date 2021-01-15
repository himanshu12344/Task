var fileUploadRoute = (function () {

    const express = require('express'),
        fileUploadRoute = express.Router(),
        fileUploadController = require('../controller/file.upload.controller');

    // var multer = require('multer')
    // var upload = multer({ dest: 'uploads/' })
    const { awsUploader } = require('../middleware/s3Uploader');

    fileUploadRoute.route('/upload')
        .post(awsUploader, fileUploadController.saveImageUrl);

    fileUploadRoute.route('/getAllFiles')
        .get(fileUploadController.getAllFiles);

    return fileUploadRoute;
})();

module.exports = fileUploadRoute;