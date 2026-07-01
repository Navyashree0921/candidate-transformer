function extractResumeData(text) {
    const data = {
        fullName: "",
        emails: [],
        phones: [],
        skills: [],
        projects: [],
        education: []
    };

    // Split into lines
    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

    // Name (first line)
    data.fullName = lines[0]
        .replace(/\s+/g, " ")
        .trim();

    // Email
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
    data.emails = [...new Set(text.match(emailRegex) || [])];

    // Phone
    const normalizePhone = require("../normalizer/phoneNormalizer");
    const phoneRegex = /(\+91[- ]?)?[6-9]\d{9}/g;
    data.phones = [...new Set(
        (text.match(phoneRegex) || [])
            .map(phone => normalizePhone(phone))
    )];

    // Skills
    const knownSkills = [
        "Java",
        "Python",
        "C",
        "C++",
        "SQL",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "React.js",
        "Node.js",
        "Express.js",
        "Spring",
        "Spring Boot",
        "MongoDB",
        "MySQL",
        "Flask",
        "Git",
        "GitHub",
        "REST APIs",
        "Postman",
        "JDBC",
        "JPA",
        "DSA",
        "OOP",
        "Operating Systems",
        "Computer Networks",
        "DBMS",
        "Data Structures",
        "Algorithms"
    ];

    const normalizeSkill = require("../normalizer/skillNormalizer");

    data.skills = [...new Set(

        knownSkills
            .filter(skill =>
                text.toLowerCase().includes(skill.toLowerCase())
            )
            .map(skill => normalizeSkill(skill))

    )];
    // -----------------------------
    // Projects
    // -----------------------------
    const projectMatch = text.match(
        /Projects([\s\S]*?)Involvement/i
    );

    if (projectMatch) {

        const projectLines = projectMatch[1]
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);

        for (const line of projectLines) {

            if (line.startsWith("•")) continue;

            if (line.endsWith(":")) {
                data.projects.push(
                    line.replace(":", "").trim()
                );
            }
        }

        data.projects = [...new Set(data.projects)];
    }
    // Education
    if (text.includes("Bachelor")) {
        data.education.push("Bachelor of Engineering");
    }

    if (text.includes("Masters PU")) {
        data.education.push("PU");
    }

    if (text.includes("Royale Apollo")) {
        data.education.push("SSLC");
    }

    return data;
}

module.exports = extractResumeData;