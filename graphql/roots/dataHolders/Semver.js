class Semver {
    constructor(version) {
        this.version = version;
    }

    get major() {
        return parseInt(this.version.split(".")[0].replace("v", ""));
    }

    get minor() {
        return this.version.split(".")[1];
    }

    get patch() {
        return this.version.split(".")[2].split("-")[0];
    }

    get channel() {
        return this.version.split("-")[1].toLowerCase();
    }

    get string() {
        return this.version;
    }
}

module.exports = Semver;
