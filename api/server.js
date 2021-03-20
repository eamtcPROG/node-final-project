require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');



mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@my-first-cluster.gdyz9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);


const server = express();
server.use(express.json());
server.use(cookieParser());
const usersRouter = require('./user/user-router');
const noteRouter = require('./note/note-router');
const authRouter = require('./authentication/authentication-router');

server.use('/api/user', usersRouter);
server.use('/api/note', noteRouter);
server.use('/api/authentication', authRouter);

server.get('/', (req, res) => {
    res.send('<h1>Notes project api</h1>')
});

module.exports = server;