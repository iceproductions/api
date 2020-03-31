
class Argument {
    constructor(data) {
        const argumentProps = [
            "type", "prompt", "default", "key", "infinite"
        ];

        for(var key in data) {
            if(!argumentProps.includes(key))continue;
            this[key] = data[key];
        }
    }
}

module.exports = Argument;
