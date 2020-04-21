
class Argument {
    constructor(data) {
        const argumentProps = [
            "type", "prompt", "default", "key", "infinite"
        ];

        for(const key in data) {
            if(!argumentProps.includes(key))continue;
            this[key] = data[key];
        }

        for(const key of argumentProps) {
            if(!this[key]) {
                if(key === "infinite") {
                    this[key] = false;
                } else {
                    this[key] = "";
                }
            }
        }
    }
}

module.exports = Argument;
