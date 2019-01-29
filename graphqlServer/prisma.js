const { Prisma } = require("prisma-binding");
const { typeDefs } = require("./prisma/generated/prisma-client/prisma-schema");


const models = [
  {
    name: "Card",
    embedded: false
  },
  {
    name: "Group",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];

const prisma = new Prisma({
  typeDefs,
  endpoint: "http://localhost:4466/xam/default",
  models
})

module.exports = prisma;