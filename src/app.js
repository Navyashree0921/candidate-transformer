const fs = require("fs");
const path = require("path");

const parseCSV = require("./parser/csvParser");
const parseResume = require("./parser/resumeParser");

const normalizePhone = require("./normalizer/phoneNormalizer");
const normalizeEmail = require("./normalizer/emailNormalizer");

const extractResumeData = require("./extractor/resumeExtractor");

const createCanonicalProfile = require("./transformer/canonicalProfile");
const merge = require("./merger/mergeEngine");
const confidence = require("./confidence/confidenceEngine");

const project = require("./projector/projector");
const validate = require("./validator/schemaValidator");

const express = require("express");


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const multer = require("multer");


const upload = multer({
    dest: path.join(__dirname, "../uploads")
});

async function main() {
    try {

        // ===========================
        // Parse CSV
        // ===========================
        const csvData = await parseCSV(
            path.join(__dirname, "../input/recruiter.csv")
        );

        console.log("========== CSV ==========");
        console.log(csvData);

        const candidate = csvData[0];

        // ===========================
        // Normalize CSV
        // ===========================
        const normalizedCandidate = {
            Name: candidate.Name?.trim(),
            Email: normalizeEmail(candidate.Email),
            Phone: normalizePhone(candidate.Phone),
            CurrentCompany: candidate.CurrentCompany?.trim() || candidate.Company?.trim() || null
        };

        console.log("\n========== NORMALIZED CSV ==========");
        console.log(normalizedCandidate);

        // ===========================
        // Parse Resume
        // ===========================
        const resumeText = await parseResume(
            path.join(__dirname, "../input/resume.pdf")
        );

        console.log("\n========== RESUME ==========");
        // console.log(resumeText);
        console.log("Resume parsed successfully");

        // ===========================
        // Extract Resume Data
        // ===========================
        const resumeData = extractResumeData(resumeText);

        console.log("\n========== EXTRACTED RESUME ==========");
        console.log(JSON.stringify(resumeData, null, 2));

        // ===========================
        // Create Canonical Profile
        // ===========================
        const canonicalProfile = createCanonicalProfile(
            normalizedCandidate,
            resumeData
        );

        // ===========================
        // Merge
        // ===========================
        const mergedProfile = merge(canonicalProfile);

        // ===========================
        // Confidence
        // ===========================
        const finalProfile = confidence(mergedProfile.profile);

        // Apply Projection
        const projectedProfile = project(finalProfile);
        console.log("\n========== CANONICAL PROFILE ==========");
        console.log(JSON.stringify(projectedProfile, null, 2));

        // ===========================
        // Save Output
        // ===========================
        const outputDir = path.join(__dirname, "../output");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, "finalProfile.json");

        fs.writeFileSync(
            outputPath,
            JSON.stringify(projectedProfile, null, 2),
            "utf8"
        );

        console.log(`\n Output saved to: ${outputPath}`);

        // Validate JSON
        const validation = validate(projectedProfile);

        console.log("\n========== VALIDATION ==========");

        if (validation.valid) {
            console.log(" JSON Schema Validation Passed");
        } else {
            console.log(" Validation Failed");
            console.log(validation.errors);
        }



    } catch (err) {
        console.error("Error:", err);
    }
}

app.get("/finalProfile", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../output/finalProfile.json")
    );

});

app.post(
    "/transform",
    upload.fields([
        { name: "csv", maxCount: 1 },
        { name: "resume", maxCount: 1 }
    ]),
    async (req, res) => {

        try {
            if (!req.files || !req.files.csv || !req.files.resume) {
                return res.status(400).json({
                    error: "Please upload both CSV and Resume PDF."
                });
            }

            const csvFile = req.files.csv[0].path;
            const resumeFile = req.files.resume[0].path;

            // Parse uploaded files
            const csvData = await parseCSV(csvFile);
            const resumeText = await parseResume(resumeFile);

            const candidate = csvData[0];

            const normalizedCandidate = {
                Name: candidate.Name?.trim(),
                Email: normalizeEmail(candidate.Email),
                Phone: normalizePhone(candidate.Phone),
                CurrentCompany:
                    candidate.CurrentCompany?.trim() ||
                    candidate.Company?.trim() ||
                    null
            };

            const resumeData = extractResumeData(resumeText);

            const canonicalProfile = createCanonicalProfile(
                normalizedCandidate,
                resumeData
            );

            const mergedProfile = merge(canonicalProfile);

            const finalProfile = confidence(mergedProfile.profile);

            const projectedProfile = project(finalProfile);

            const outputDir = path.join(__dirname, "../output");

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(
                path.join(outputDir, "finalProfile.json"),
                JSON.stringify(projectedProfile, null, 2),
                "utf8"
            );
            res.json(projectedProfile);

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }

    }
);

main().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});