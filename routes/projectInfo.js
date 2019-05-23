const router = require('express').Router();
const {isLogged} = require('../handlers/middlewares');
const upload =('../handlers/cloudinary.js');
const Project = require('../models/Project');
const Comment= require('../models/Comment');

/* 
http://localhost:3000/artist/project
*/

/* ---------------------------- PROJECT VIEW ----------------------- */
router.get('/project-view/:id', (req, res, next) => {

    const { id } = req.params

    Project.findById(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json(err))
});

/* -------------------------- EDIT PROJECT ----------------------------------- */
/* 
        "title":"",
        "date":"",
        "techniques":"",
        "description":""
*/
/* no olvidar regresar el LOGGED */
router.patch('/project-edit/:id', (req, res, next) => {

    const { title, date, techniques, description, imgs } = req.body
    
    const parametersToUpdate = {...req.body}
    const titleLenght = 50;
    const descLenght = 200;

    if(!title || !techniques || !description) {
        res.status(400).json({
            message: 'Provide all the necessary data: title, techinques and description'
        })
    }

    if(parametersToUpdate.title && parametersToUpdate.title.length > titleLenght) {
        res.status(400).json({
            message: `Title: max ${titleLenght} characters`
        })
        next()
    }

    if(parametersToUpdate.description && parametersToUpdate.description.length > descLenght) {
        res.status(400).json({
            message: `Description: max ${descLenght} charactes`
        })
    }

    if(techniques) {
        parametersToUpdate.techniques = techniques;
    }

    if(date) {
        parametersToUpdate.date = date;
    }

   
User.findByIdAndUpdate(id, { $set: parametersToUpdate}, {new: true})
    .then(project => { 
        res.status(200).json(project)
    })
    .catch(err => res.send(err))
    });


/* -------------------------------- CREATE PROJECT ---------------------------------------- */
/* poder subir varias imagenes, crear foto de portada */
/* 
        "title":"",
        "date":"",
        "techniques":"",
        "description":""
*/
/* no olvidar regresar el LOGGED */
router.post('/project-create', (req, res, next) => {
    
    const { title, date, techniques, description, imgs } = req.body;
    const titleLenght = 50;
    const descLenght = 200;

    if(!title || !techniques || !description) {
        res.status(400).json({
            message: 'Provide all the necessary data: title, techniques and description'
        })
    }

    if(title.length > titleLenght) {
        res.status(400).json({
            message: `Title: max ${titleLenght} characters`
        })
        next()
    }

    if(description.length > descLenght) {
        res.status(400).json({
            message: `Description: max ${descLenght} charactes`
        })
    }

    Project.create({title, date, techniques, description, imgs: req.files})
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json(err))
});


/* ------------------------------ DELETE PROJECT -------------------- */
/* no olvidar regresar el LOGGED */
router.delete('/project-delete/:id', isLogged, (req, res, next) => {
    
    const { id } = req.params
    
    Project.findByIdAndDelete(id)
    .then(res.status(200).json({
        message: 'project DELETED succesfully'
    }))
    .catch(err => res.status(500).json(err))
});


/*  ---------------- COMMENTS ------------------ */
/* no olvidar regresar el LOGGED */
/* router.post('/post', isLogged, (req, res, next) => {
    const userID = req.user.id
    const { userId, comment } = req.body
    Comment.create({ userId: userId, comment})
    .then(comment => {
      post.userID = userID
      res.status(200).json(comment)
    })
    .catch(err => res.status(500).json(err))
  }) */

module.exports = router;