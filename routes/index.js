const router = require('express').Router();
const User = require('../models/User');
const {isLogged} = require('../handlers/middlewares');
const uploadCloud = require('../handlers/cloudinary');

router.get('/', (req, res, next) => {
  
});

router.get('/profile/:id', isLogged, (req, res, next) => {

  const {id} = req.params
  const userId = req.user._id
  let editPermission = false

  User.findById(id)
  .then(user => {
    if(userId == id){
      editPermission = true
    }
    user.editPermision = editPermission
    res.status(200).json(user)
  })
  .catch(err => res.send(err))
});

module.exports = router;
