const fs = require("fs");
const path = require("path");

function project(profile) {

    const configPath = path.join(__dirname, "../../config.json");

    const config = JSON.parse(
        fs.readFileSync(configPath, "utf8")
    );

    const output = {};

    for (const field of config.fields) {

        if (profile[field] !== undefined) {
            output[field] = profile[field];
        }

    }

    return output;
}

module.exports = project;