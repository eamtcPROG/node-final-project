const express = require('express');
const bcrypt = require('bcryptjs');
const  User  = require('./user-model');
const {validateUserBody} = require('../middlewares/middlewares');
const router = express.Router();

router.get('/', (req, res,next) => {
  User.find(req.query).then((users) =>{
    res.status(200).json(users);
  }).catch((error) => {
    next(error);
    
  });
});

router.get('/:id', (req, res,next) => {
  User.findById(req.params.id).then((user) =>{
    res.status(200).json(user);
  }).catch((error) => {
    next(error);
  });
});

router.post('/',validateUserBody,async  (req, res,next) => {
    try {
    const { username, password,email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email invalid' });
    }
    const newUser = await User.add({
        username,
        password: await bcrypt.hash(password, 14),
        email
      });
  
          res.status(201).json(newUser);

    }catch(error) {
          next(error);
        };
  });

  router.put('/:id',async (req, res,next) => {
    const { username, password,email } = req.body;
    const changedUser ={
        username,
        password: await bcrypt.hash(password, 14),
        email
    }
    User.update(req.params.id, changedUser)
      .then((updatedUser) => {
        res.status(200).json({ updatedUser });
      })
      .catch((error) => {
        next(error)
      });
  });

  router.delete('/:id',(req, res,next) => {
    User.remove(req.params.id)
      .then((deleteduser) => {
        res.status(200).json({ deleteduser });
      })
      .catch((error) => {
        next(error);
      });
  });

  module.exports = router;