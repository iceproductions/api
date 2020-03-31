const ServerInfo = require("./dataHolders/ServerInfo");
const client = require("./mysql");
const CommandList = require("./dataHolders/CommandList");

module.exports = {
    info: () => {
        return new ServerInfo(client);
    },
    commands: CommandList,
    command: ({ name }) => {
        return CommandList.filter(c => c.name === name)[0];
    }
};
