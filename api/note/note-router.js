const express = require('express');
const  User  = require('../user/user-model');
const  Note  = require('./note-model');

const router = express.Router();

router.get('/:id',async (req, res) => {
    const foundUser = await User.findById( req.params.id ).catch((err) => {
      res.status(500).json({ message: err });
    });
    const notes = await Note.find(
      { user_id: req.params.id }
    ).catch((err) => {
      res.status(500).json({ message: err });
    });
    
    res.json({ foundUser, notes });
  });

  router.post('/',async  (req, res) => {
    Note.add(req.body)
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the note',
      });
    });
  });

  router.delete('/:id',(req, res) => {
    Note.remove(req.params.id)
      .then((deletednote) => {
        res.status(200).json({ deletednote });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  });

  router.put('/:id', (req, res) => {
    const changedNote = req.body;
    Note.update(req.params.id, changedNote)
      .then((updatedNote) => {
        res.status(200).json({ updatedNote });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  });
  module.exports = router;