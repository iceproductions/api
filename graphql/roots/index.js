const ServerInfo = require("./dataHolders/ServerInfo");
const client = require("./mysql");
const CommandList = require("./dataHolders/CommandList");
const Guild = require("./dataHolders/Guild");

module.exports = {
    info: () => {
        return new ServerInfo(client);
    },
    guild: async ({ id }) => {
        var guild = new Guild(id);
        if((await guild.fetchGuild()).error) return null;
        return guild;
    },
    commands: CommandList,
    command: ({ name }) => {
        return CommandList.filter(c => c.name === name)[0];
    }
};
