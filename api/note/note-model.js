const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  text:{
    type:String,
    required: true,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Note = mongoose.model('Note', noteSchema);

const find = () => {
    return Note.find().exec();
  };
  const add = (note) => {
    return new Note(note).save();
  };
  const findById = (noteId) => {
    return Note.findById(noteId).exec();
  };
  
  const remove = (noteId) => {
    return Note.findOneAndDelete({ _id: noteId }).exec();
  };
  
  const update = (noteId, changedNote) => {
    return Note.findByIdAndUpdate(noteId, changedNote).exec();
  };
  module.exports = {
    find,
    add,
    findById,
    remove,
    update,
  };