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
  
  module.exports = { validateUserBody ,error};