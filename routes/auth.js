const router = require('express').Router();
const passport = require('passport');

const User = require('../models/User');
const {isLogged} = require('../handlers/middlewares');

/* 
http://localhost:3000/auth
*/

/* -------------------------------- SIGNUP --------------------------------------- */
/* 
        "email":"",
        "password":"",
        "username":"",
        "realName":"",
        "bday":"",
        "speciality":""
*/
router.post('/signup', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const realName = req.body.realName;
    const bday = req.body.bday;
    const speciality = req.body.speciality;
    
    const passwordLength = 3
    const usernameLength = 12

    if(!email || !password || !realName || !username || !bday || !speciality) {
        res.status(400).json({
            message: 'Check the data you could be missing!!! -->> (email, password, username, realName, bday, speciality)'
        })
        next()
    }
    
    if(password.length < passwordLength) {
        res.status(400).json({
            message: `Your password is too short, must be at least ${passwordLength} characters long`
        })
        next()
    }

    if(username.length > usernameLength){
        res.status(400).json({
            message: `That username is too long, must be less than ${usernameLength} characters`
        })
        next()
    }

    User.register({...req.body}, password)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))

    req.login(User, (err) => {
        if(err) {
            res.status(500).json({
                message: 'Ups! Something went bad :('
            })
            return
        }

        res.status(200).json(User)
    })
})

/* ------------------------------------- LOGIN --------------------------- */
/* 
        "email":"",
        "password":""
*/
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, infoErr) => {

        if(err) {
            console.log(err)
            return res.status(500).json({ err, infoErr })
        }
            if(!user)return res.status(401).json({
            message: 'That user does NOT exist dude...'
        });
        req.login(user, err => {
            if(err) return res.status(500).json(err)
            res.status(200).json(user)
        })
    }) (req, res, next)
})

/* --------------------------------------- LOGGED IN ---------------------------------*/
router.post('/logged', isLogged, (req, res, next) => {
    res.status(200).json({
        message: 'You are logged'
    })
})

/* ------------------------------------- LOGOUT  ---------------------------------*/
router.post('/logout', isLogged, (req, res, next) => {
    req.logOut()
    res.status(200)
    .clearCookie('connect.sid', { path: '/' })
    .json({
        message: 'Logged Out'
    })
})

/* ------------------------------ DELETE ACCOUNT -------------------- */
router.delete('/delete-profile/:id', (req, res, next) => {
    
    const { id } = req.params
    
    User.findByIdAndDelete(id)
    .then(res.status(200).json({
        message: 'ACCOUNT DELETED succesfully, missing you already :('
    }))
    .catch(err => res.status(500).json(err))
});

module.exports= router;