const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const { connectDB } = require('./config/connection'); 

const { typeDefs, resolvers } = require('./schemas');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  server.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV === 'production') {
   
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {

      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

