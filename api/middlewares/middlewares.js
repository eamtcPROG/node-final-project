const validateUserBody = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username or password invalid' });
    }
  
    next();
  };
  
  module.exports = { validateUserBody };