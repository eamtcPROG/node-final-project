const jwt = require('jsonwebtoken');

const validateUserBody = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username or password invalid' });
    }
  
    next();
  };

  const error = (err, req, res, next) => {
    console.error(err);
  
    res.status(500).json({
      message: 'Something went wrong',
    });
  };

  const restrict = (req, res, next) => {
    const { token } = req.cookies;
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      req.decoded = decoded;
      next();
    });
  };
  
  
  module.exports = { validateUserBody ,error,restrict};