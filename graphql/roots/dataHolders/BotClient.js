const got = require("got");

class BotClient {
    async status() {
        try {
            await got("http://localhost:8856/");
            return 1;
        } catch(e) {
            console.warn(e);
            return 2;
        }
    }
}

module.exports = BotClient;
