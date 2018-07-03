const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('./graphql/schema')

function loggingMiddleware(req, res, next) {
  console.log(`ip: ${req.ip}`);
  next();
}

var app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: makeExecutableSchema,
  graphiql: process.env.NODE_ENV === 'development',
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');