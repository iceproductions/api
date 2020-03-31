const MysqlTable = require("./MysqlTable");
const Semver = require("./Semver");
const BotClient = require("./BotClient");

const botClient = new BotClient();

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

    get status() {
        return new Promise(async (resolve, reject) => {
            var status = await botClient.status();

            switch(status) {
                case 1:
                    return resolve("running");
                case 2:
                    return resolve("offline");
            }
        });
    }
};
