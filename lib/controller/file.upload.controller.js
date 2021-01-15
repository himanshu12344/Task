var fileUploadController = (function () {
    const fileUploadedModel = require('../model/file.upload.model');

    const saveImageUrl = async (req, res) => {
        try {
            var fileObj = {
                fileName: req.file.originalname,
                filePath: req.file.location
            }
            var fileData = new fileUploadedModel(fileObj);
            var result = await fileData.save();
            res.status(200)
                .json(fileObj)

        } catch (err) {
            console.log(err);
            res.status(400)
                .json({ err: err })
        }
    }

    const getAllFiles = async (req, res) => {
        var result = await fileUploadedModel.find({}).lean().exec();

        res.status(200).json({data: result});
    }

    return {
        saveImageUrl: saveImageUrl,
        getAllFiles: getAllFiles
    };
})();

module.exports = fileUploadController;