const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const { s3Config } = require('../config/s3Uploader.config');

const accepted_extensions = s3Config.accepted_extensions;
const bucketName = s3Config.bucketName;
const publicRead = s3Config.accessType.publicRead;
const accessKeyId = s3Config.accessKeyId;
const secretAccessKey = s3Config.secretAccessKey;
const region = s3Config.region;
const s3 = new aws.S3({ accessKeyId, secretAccessKey, region, });

const fileUploadAws = multerS3({
    s3: s3,
    bucket: (req, file, cb) => {
        cb(null, bucketName)
    },
    acl: publicRead,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        cb(null, file.originalname)
    }, 
    limits: {
        fileSize: 25 * 1024 * 1024 * 1024 * 1024
    }
})

const aws_Upload = multer({
    fileFilter: (req, file, cb) => {
        if (file) {
            if (accepted_extensions.some(ext => file.originalname.toLowerCase().endsWith("." + ext.toLowerCase()))) {
                return cb(null, true);
            }
            return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'));
        }
        return cb(new Error('No file to upload!'));
    },
    storage: fileUploadAws, 
    limits: {
        fileSize: 25 * 1024 * 1024 * 1024 * 1024
    }
})

const uploader = aws_Upload.single('file');

const awsUploader = (req, res, next) => {
    uploader(req, res, (err) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        // if (req && !req.file)
        //     res.status(httpStatus.BAD_REQUEST).send({ error: httpStatus.getStatusText(httpStatus.BAD_REQUEST) })
        // res.status(httpStatus.OK).json({ data: req.file, status: true });
        console.log(req.file);
        next();
    })
}

const deleteAwsFile = (req, res) => {
    try {
        s3.deleteObject({
            Bucket: bucketName,
            Key: req.body.fileKey
        }, (err, suc) => {
            if (err) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
            }
            res.status(httpStatus.OK).send(suc);
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

module.exports = {
    deleteAwsFile,
    awsUploader
}