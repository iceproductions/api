const got = require("got");

module.exports = class Guild {
    constructor(id) {
        this.id = id;
    }
    /*
    type Guild {
        id: String!,
        owner: User,
        channels: [Channel!]!,
        userLength: Int!,
        settings: GuildSettings,

        channel(id: Int!): Channel,
        user(id: Int!): User
    }
    */

    async fetchGuild() {
        if(!this.guild) {
            var data = await got("http://localhost:8856/guild/" + this.id);
            this.guild = JSON.parse(data.body);
        }
        return this.guild;
    }

    get owner() {

    }

    get channels() {

    }

    async userLength() {
        var guild = await this.fetchGuild();
        return guild.memberCount;
    }

    get settings() {

    }

    channel({ id }) {

    }

    user({ id }) {

    }
};
