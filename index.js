const express = require("express");
const graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path");
const app = express();

const root = require("./graphql/roots/");

const PORT = 8855;

app.use("/v1", graphql({
    schema: buildSchema(fs.readFileSync(path.join(__dirname, "./graphql/main.graphql"))),
    rootValue: root,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("Ready");
});
