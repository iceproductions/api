const ServerInfo = require("./dataHolders/ServerInfo");
const client = require("./mysql");

module.exports = {
    info: () => {
        return new ServerInfo(client);
    }
};
