const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");

const prisma = require("./prisma");

const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Group = require("./resolvers/Group");
const Card = require("./resolvers/Card");

const resolvers = {
  Mutation, Query,
  User,
  Group,
  Card,
  Subscription
};

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "public")


app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



const server = new ApolloServer({
  typeDefs: importSchema("./graphqlServer/schema.graphql"),
  resolvers,
  context: {
    prisma
  }
});

server.applyMiddleware({ app });

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening and graphql on ${server.graphqlPath}`);
});




