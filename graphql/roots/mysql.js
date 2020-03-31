const config = require("../../config.json").mysql;
const mysql = require("mysql");

module.exports = mysql.createPool(config);
