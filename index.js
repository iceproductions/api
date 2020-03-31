const express = require("express");
const graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path");
const app = express();

const root = require("./graphql/roots/");

const PORT = 8855;

app.use("/v1", graphql({
    schema: buildSchema(fs.readFileSync(path.join(__dirname, "./graphql/main.graphql"), "utf-8")),
    rootValue: root,
    graphiql: true
}));

app.get("/", (req, res) => {
    res.redirect("/v1");
});

app.get("/version", (req, res) => {
    req.json({
        version: "v1"
    });
});

app.listen(PORT, () => {
    console.log("Ready");
});
