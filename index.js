const express = require("express");
const graphql = require("express-graphql");
const bodyParser = require("body-parser");
const {
    buildSchema
} = require("graphql");
const fs = require("fs");
const path = require("path");
const braintree = require("braintree");
const cors = require("cors");
const app = express();

const root = require("./graphql/roots/");

const config = require("./config.json");

if(config.paypal){
    const gateway = braintree.connect({
        accessToken: config.paypal.access
    });
}

const PORT = 8855;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

if(config.paypal){
    app.get("/client_token", (req, res) => {
        gateway.clientToken.generate({}, function(err, response) {
            if(err)throw err;
            res.send(response.clientToken);
        });
    });

    app.post("/nonce", (req, res) => {
        console.log("Making sale");
        var saleRequest = {
            amount: req.body.amount,
            merchantAccountId: "USD",
            paymentMethodNonce: req.body.nonceV,
            orderId: req.body.orderId,
            descriptor: {
                name: "ice bot*Donation"
            },
            options: {
                paypal: {
                    customField: "PayPal custom field",
                    description: "Testing payment"
                },
                submitForSettlement: true
            }
        };

        gateway.transaction.sale(saleRequest, function(err, result) {
            if(err) {
                res.send("<h1>Error:  " + err + "</h1>");
            } else if(result.success) {
                res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
            } else {
                res.send("<h1>Error happened:  " + result.message + "</h1>");
            }
        });
        console.log("Done sale");
    });
}

app.listen(PORT, () => {
    console.log("Ready");
});
