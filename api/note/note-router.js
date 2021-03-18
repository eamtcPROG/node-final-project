const express = require('express');
const  User  = require('../user/user-model');
const  Note  = require('./note-model');
const {error} = require('../middlewares/middlewares');
const router = express.Router();

router.get('/:id',error,async (req, res,next) => {
    const foundUser = await User.findById( req.params.id ).catch((err) => {
      res.status(500).json({ message: err });
    });
    const notes = await Note.find(
      { user_id: req.params.id }
    ).catch((error) => {
     next(error)
    });
    
    res.json({ foundUser, notes });
  });

  router.post('/',error,async  (req, res,next) => {
    Note.add(req.body)
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((error) => {
     next(error);
    });
  });

  router.delete('/:id',error,(req, res,next) => {
    Note.remove(req.params.id)
      .then((deletednote) => {
        res.status(200).json({ deletednote });
      })
      .catch((error) => {
        next(error);
      });
  });

  router.put('/:id',error, (req, res,next) => {
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