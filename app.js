const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const {
  verify: { typeDefs, resolver },
} = require("./src/routes");

// The root provides a resolver function for each API endpoint
const root = {
  verify: resolver,
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(typeDefs),
    rootValue: root,
    graphiql: true,
  })
);
app.listen(8080);
console.log("Running Studio Sol avaliation at http://localhost:8080/graphql");
