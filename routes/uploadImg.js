const router = require('express').Router();
const uploadCloud = require('../handlers/cloudinary');

const User = require('../models/User');

/* router.post('/upload', uploadCloud.single(imageUrl), (req, res, next) => {
    if(!req.file){
        return next(new Error('No file uploaded!'));
    }
    res.json({
        secure_url: req.file.secure_url
    })
}) */

/* guardar url en prodpiedad del usuario, le mando imagen y me regresa url */

module.exports = router;