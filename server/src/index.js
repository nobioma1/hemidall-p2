const server = require('./api/server');

const PORT = process.env.PORT || 5000;

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
};

startServer();
