const express = require('express');
const bcrypt = require('bcryptjs');
const  User  = require('./user-model');
const {validateUserBody} = require('../middlewares/middlewares');
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
          console.log(error);
          res.status(500).json({
            message: 'Error adding the user',
          });
        };
  });

  router.put('/:id',async (req, res) => {
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
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  });

  router.delete('/:id',(req, res) => {
    User.remove(req.params.id)
      .then((deleteduser) => {
        res.status(200).json({ deleteduser });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  });

  module.exports = router;