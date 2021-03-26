const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../user/user-model');
const {validateUserBody,restrict} = require('../middlewares/middlewares');

const router = express.Router();

router.post('/login',validateUserBody, async (req, res,next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findByUsername(username);
      const passwordValid = await bcrypt.compare(password, user.password);
        
      if (!user || !passwordValid) {
        return res.status(401).json({
          message: 'Invalid Credentials',
        });
      }
  
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 1000 * 60 * 60 * 24 * 7, 
        }
      );
    
      res.cookie('token', token);
    
  
      res.status(200).json({
        message: `Welcome ${user.username}!`,
      });
    } catch (error) {
       next(error);
          
    }
  });

  router.get('/logout', async (req, res,next) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout' });
    } catch (error) {
        next(error);
    }
  });

  router.get('/check-auth', restrict, (req, res) => {
    res.status(200).json({ message: 'ok' });
  });

module.exports = router;