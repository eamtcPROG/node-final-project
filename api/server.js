if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');



mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@my-first-cluster.gdyz9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);


const server = express();
//const whitelist = ['http://localhost:3000','https://notes-app-exercise.vercel.app'];
/* const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}; */

server.use(cors(corsOptions));
server.use(bodyParser.json());
//server.use(express.json());
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

server.use((err, req, res, next) => {
    console.error(err);
  
    res.status(500).json({
      message: 'Something went wrong',
    });
  });

module.exports = server;