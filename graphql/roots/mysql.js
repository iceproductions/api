const config = require("../../config.json").mysql;
const Mysql = require("mysql");

module.exports = new Mysql(config);
