const fs = require("fs");
const vm2 = require("vm2");
const Argument = require("./Argument");

class Command {
    constructor(path) {
        var contents = fs.readFileSync(path);
        var match = /super\(client, ({((?!this\.client)(?!run(?!\?))[\s\S])*})\);/mi.exec(contents);
        if(!match) {
            return null;
        };

        var vm = new vm2.NodeVM();

        var code = "module.exports = " + match[1];
        var data = vm.run("module.exports = " + code);

        this.parse(data);
    }

    parse(data) {
        const allowedProps = [
            "name", "group", "description", "aliases", "usage", "args"
        ];
        const mappings = {
            args: "arguments"
        };

        for(const prop in data) {
            if(allowedProps.includes(prop)) {
                if(mappings[prop]) {
                    this[mappings[prop]] = data[prop];
                } else {
                    this[prop] = data[prop];
                }
            }
        }

        for(const argument in this.arguments) {
            this.arguments[argument] = new Argument(this.arguments[argument]);
        }

        for(let prop of allowedProps) {
            if(mappings[prop]) {
                prop = mappings[prop];
            }
            if(!this[prop]) {
                if(["arguments", "aliases"].includes(prop)) {
                    this[prop] = [];
                } else {
                    this[prop] = "";
                }
            }
        }
    }
}

module.exports = Command;
