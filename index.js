const server = require('./api/server');

server.listen(5000, () => {
    console.log(`Running at http://localhost:5000`);
  });