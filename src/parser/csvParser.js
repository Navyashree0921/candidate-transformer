const fs = require("fs");
const csv = require("csv-parser");

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const candidates = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                candidates.push(row);
            })
            .on("end", () => {
                resolve(candidates);
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}

module.exports = parseCSV;