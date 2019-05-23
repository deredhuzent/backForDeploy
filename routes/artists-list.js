const router = require('express').Router();
const User = require('../models/User');

/*
http://localhost:3000/list
*/
/* ----------------------------- ARTISTS LIST -------------------------------------- */
router.get('/artists', (req, res, next) => {

    User.find()
    .then(artists => {
        res.status(200).json(artists)
    })
    .catch(err => res.status(500).json(err))
});

module.exports = router;