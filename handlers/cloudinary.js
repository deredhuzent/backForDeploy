const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISE
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'profilePsyche',
    allowedFormats: ['jpg', 'png'],
    /* params: { resource_type: 'raw' }, */
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({storage});

module.exports = upload;