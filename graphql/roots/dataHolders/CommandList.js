const walkSync = require("walk-sync");
const path = require("path");
const Command = require("./Command");

const commands = walkSync(path.join(__dirname, "../../../", require("../../../config.json").bot, "cmd"), {
    directories: false,
    includeBasePath: true
});

var commandList = [];

for(var command of commands) {
    var cmd = new Command(command);
    if(cmd) {
        commandList.push(cmd);
    }
}

commandList = commandList.filter(val => val.name);

module.exports = commandList;
