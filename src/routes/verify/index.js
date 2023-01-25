const { verifyTypeDefs } = require("./typeDefs");
const { verifyResolver } = require("./resolver");

module.exports = {
  typeDefs: verifyTypeDefs,
  resolver: verifyResolver,
};
