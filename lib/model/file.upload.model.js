(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
    const schemaOptions = {
        timestamps: { createdAt: 'addedOn', updatedAt: 'updatedOn' },
    };

    var fileUploadedModel = new Schema({
        fileName: {
            type: 'string'
        },
        filePath: {
            type: 'string'
        }
    }, schemaOptions);

    module.exports = mongoose.model('files', fileUploadedModel, 'files');
})();