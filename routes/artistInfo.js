const router = require('express').Router();
const {isLogged} = require('../handlers/middlewares');
const User = require('../models/User');
const Proyect = require('../models/Project');
const upload = require('../handlers/cloudinary');

/* 
http://localhost:3000/artist
*/

/* ----------------------------- EDIT PROFILE -------------------------------------- */
/* 
        "username":"",
        "realName": "",
        "bday": "",
        "speciality":"",
        "phone": "",
        "location":"",
        "presentation":"",
        "tools":"",
        "website":"",
        "facebook":"",
        "instagram":"",
        "deviantArt":"",
        "linkedin":"",
        "youtube":"",
        "dailymotion":""
*/
/* no olvidar regresar el LOGGED */
router.patch('/edit-profile/:id', upload.single('profileImg'),(req, res, next) => {
  
  const { id } = req.params;
  const {website, facebook, instagram, deviantArt, linkedIn, youtube, dailymotion } = req.body;
  const correctLink = (url = '') => url.indexOf('https://') !== -1 ? url : 'https://' + url; 
  
  const parametersToUpdate = {...req.body};
  const usernameLength = 12
  const presLength = 300
  
  if(parametersToUpdate.username && parametersToUpdate.username.length > usernameLength){
    res.status(400).json({
        message: `That username is too long, must be less than ${usernameLength} characters`
    })
    next()
  }
  
  if(parametersToUpdate.presentation && parametersToUpdate.presentation.length > presLength){
    res.status(400).json({
      message: `I'm glad you are inspired, but make sure you don't write too much about yourself, the max of characters is ${presentationLength}`
    })
  }
  
  if(req.file) {
    parametersToUpdate.profileImg = req.file.secure_url;
  }
  if(website) {
    parametersToUpdate.website = correctLink(website);
  }
  if(facebook) {
    parametersToUpdate.facebook = correctLink(facebook);
  }
  if(instagram) {
    parametersToUpdate.instagram = correctLink(instagram);
  }
  if(deviantArt) {
    parametersToUpdate.deviantArt = correctLink(deviantArt);
  }
  if(linkedIn) {
    parametersToUpdate.linkedIn = correctLink(linkedIn);
  }
  if(youtube) {
    parametersToUpdate.youtube = correctLink(youtube);
  }
  if(dailymotion) {
    parametersToUpdate.dailymotion = correctLink(dailymotion);
  }
  User.findByIdAndUpdate(id, { $set: parametersToUpdate}, 
    {new: true})
   .then(user => { 
    res.status(200).json(user)
  })
  .catch(err => res.send(err))
  });

/* ------------------------- VIEW LIST OF PROYECT ---------------------------------------- */
/*  Los proyectos se ven de acuerdo a cada artista */

router.get('/project-list', (req, res, next) => {
    Proyect.find()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => res.status(500).json(err))
});


module.exports = router;