const got = require("got");

class BotClient {
    async status() {
        try {
            await got("http://localhost:8856/", {
                timeout: {
                    lookup: 50,
                    socket: 200
                }
            });
            return 1;
        } catch(e) {
            console.warn(e);
            return 2;
        }
    }
}

module.exports = BotClient;
