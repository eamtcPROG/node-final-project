const express = require('express');
const  User  = require('../user/user-model');
const  Note  = require('./note-model');
const {restrict} = require('../middlewares/middlewares');
const router = express.Router();

router.get('/',restrict,async (req, res,next) => {
    
    /* const foundUser = await User.findById( req.decoded.id ).catch((err) => {
      res.status(500).json({ message: err });
    }); */

    const notes = await Note.find(
      { user_id: req.decoded.id }
    ).catch((error) => {
     next(error)
    });
    
    res.json({ /* foundUser, */ notes });
  });

  router.get('/:id',restrict,async (req, res,next) => {
    
    try {
      const foundNote = await Note.findById(req.params.id,);
  
      if (!foundNote) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      return res.status(200).json(foundNote);
    } catch (error) {
      next(error);
    }
  });

  router.post('/',restrict,async  (req, res,next) => {
    const { title, text } = req.body;
    const userId = req.decoded.id;

    Note.add({ title, text, user_id: userId })
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((error) => {
     next(error);
    });
  });

  router.delete('/:id',(req, res,next) => {
    Note.remove(req.params.id)
      .then((deletednote) => {
        res.status(200).json({ deletednote });
      })
      .catch((error) => {
        next(error);
      });
  });

  router.put('/:id', (req, res,next) => {
    const changedNote = req.body;
    Note.update(req.params.id, changedNote)
      .then((updatedNote) => {
        res.status(200).json({ updatedNote });
      })
      .catch((error) => {
        next(error);
      });
  });
  module.exports = router;