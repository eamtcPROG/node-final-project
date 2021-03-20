const express = require('express');
const bcrypt = require('bcryptjs');
const  User  = require('./user-model');
const {validateUserBody,error} = require('../middlewares/middlewares');
const router = express.Router();

router.get('/', (req, res) => {
  User.find(req.query).then((users) =>{
    res.status(200).json(users);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id).then((user) =>{
    res.status(200).json(user);
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  });
});

router.post('/',validateUserBody,error,async  (req, res,next) => {
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

  router.put('/:id',error,async (req, res,next) => {
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

  router.delete('/:id',error,(req, res,next) => {
    User.remove(req.params.id)
      .then((deleteduser) => {
        res.status(200).json({ deleteduser });
      })
      .catch((error) => {
        next(error);
      });
  });

  module.exports = router;