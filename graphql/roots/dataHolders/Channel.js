const got = require("got");

module.exports = class Guild {
    constructor(id, guild) {
        this.id = id;
        this.guild = guild;
    }

    async fetchGuild() {
        if(!this.guild) {
            var data = await got("http://localhost:8856/channel/" + this.guild + "/" + this.id);
            this.guild = JSON.parse(data.body);
        }
        return this.guild;
    }

    async getProperty(prop) {
        return (await this.fetchGuild())[prop];
    }

    async type() {
        var map = {
            text: "Text",
            dm: "DM",
            voice: "Voice",
            video: "Video",
            news: "News"
        };
        return map[await this.getProperty("type")];
    }
};
