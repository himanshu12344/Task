const s3Config = {
    bucketName: 'adhana',
    region: '',
    accessKeyId: 'AKIAJRXDMR5YUSJQPCNA',
    secretAccessKey: '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',
    accepted_extensions: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'xlsx', 'xls', "ppt", "pptx", "docx"],
    // accepted_extensions: ['jpg', 'jpeg', 'mp4'],
    accessType: {
        publicRead: "public-read",
        private: "private",
        public: "public-read-write",
    }
}
module.exports = { s3Config }