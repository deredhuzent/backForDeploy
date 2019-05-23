const router = require('express').Router();
const {isLogged} = require('../handlers/middlewares');
const Timeline = require('../models/Timeline');

/* 
http://localhost:3000/artist
*/

/* -------------------------- EDIT EVENT ----------------------------------- */
/* 
        "title":"",
        "date":"",
        "location":"",
        "description":"",
        "link":""
*/
/* no olvidar regresar el LOGGED */
router.patch('/eventDate-edit/:id', (req, res, next) => {

    const { title, date, location, description, link } =req.body
    const { id } = req.params;
    const titleLenght = 25;
    const descLenght = 100;

    if(!title || !date || !location || !description){
        res.status(400).json({
            message: 'It is necessary that you specify everything: (title, date, location, description), remember this is your professional portafolio'
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

Timeline.findByIdAndUpdate(id, { $set: title, date, location, description, link }, {new: true})
.then(eventD => {
    console.log(eventD)
    /* res.status(200).json(eventD) */
})
.catch(err => res.send(err))
})
/* ------------------------- TIMELINE LIST ---------------------------------------- */
router.get('/line', (req, res, next) =>{
    Timeline.find()
    .then(events => {
        res.status(200).json(events)
    })
    .catch(err => res.status(500).json(err))
})
/* ------------------------- CREATE EVENT ---------------------------------------- */
/* 
        "title":"",
        "date":"",
        "location":"",
        "description":"",
        "link":""
*/
/* no olvidar regresar el LOGGED */
router.post('/eventDate-create', (req, res, next) => {
    
    const { title, date, location, description, link  } = req.body;
    const titleLenght = 25;
    const descLenght = 100;

    if(!title || !date || !location || !description){
        res.status(400).json({
            message: 'It is necessary that you specify everything: (title, date, location, description), remember this is your professional portafolio'
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

    Timeline.create({ title, date, location, description, link })
    .then(eventD => {
        res.status(200).json(eventD)
    })
    .catch(err => res.status(500).json(err))

  });

  /* ------------------------------ DELETE EVENT -------------------- */
/* no olvidar regresar el LOGGED */
router.delete('eventDate-delete/:id', (req, res, next) => {

    const { id } = req.params

    Timeline.findByIdAndDelete(id)
    .then(res.status(200).json({
        message: 'Date DELETED succesfully'
    }))
    .catch(err => res.status(500).json(err))
})
  module.exports = router;