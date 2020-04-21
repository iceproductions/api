
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

    get owner() {

    }

    get channels() {

    }

    get userLength() {

    }

    get settings() {

    }

    channel({ id }) {

    }

    user({ id }) {

    }
};
