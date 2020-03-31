const MysqlTable = require("./MysqlTable");
const Semver = require("./Semver");

const VERSION = "v0.1.0-ALPHA";

module.exports = class ServerInfo extends MysqlTable {
    constructor(client) {
        super(client, "server");
    }

    get repository() {
        return "https://github.com/iceproductions/api";
    }

    get version() {
        return new Semver(VERSION);
    }
};
