const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../user/user-model');
const {validateUserBody} = require('../middlewares/middlewares');

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
          email: user.email,
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
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Something went wrong !`,
          });
          
    }
  });

  router.get('/logout', async (req, res) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout' });
    } catch (err) {
        res.status(500).json({
            message: err,
          });
    }
  });

module.exports = router;