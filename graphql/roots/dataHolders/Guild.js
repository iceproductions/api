const got = require("got");

module.exports = class Guild {
    constructor(id) {
        this.id = id;
    }

    async fetchGuild() {
        if(!this.guild) {
            var data = await got("http://localhost:8856/guild/" + this.id);
            this.guild = JSON.parse(data.body);
        }
        return this.guild;
    }

    async getProperty(prop) {
        return (await this.fetchGuild())[prop];
    }

    async icon() {
        var guild = await this.fetchGuild();
        return guild.iconURL;
    }

    async owner() {
        var guild = await this.fetchGuild();
        var { ownerID } = guild;
        return ownerID;
    }

    async channels() {

    }

    async userLength() {
        var guild = await this.fetchGuild();
        return guild.memberCount;
    }

    async settings() {

    }

    get acronym() {
        return this.getProperty("nameAcronym");
    }

    get splash() {
        return this.getProperty("splashURL");
    }

    get name() {
        return this.getProperty("name");
    }

    get banner() {
        return this.getProperty("bannerURL");
    }

    get description() {
        return this.getProperty("description");
    }

    get emojis() {
        return this.getProperty("emojis");
    }

    get created() {
        return this.getProperty("createdTimestamp");
    }

    channel({ id }) {

    }

    user({ id }) {

    }
};
