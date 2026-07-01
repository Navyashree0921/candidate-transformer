const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const ajv = new Ajv();

function validate(profile) {

    const schema = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "../../schema.json"),
            "utf8"
        )
    );

    const validateSchema = ajv.compile(schema);

    const valid = validateSchema(profile);

    return {
        valid,
        errors: validateSchema.errors
    };
}

module.exports = validate;