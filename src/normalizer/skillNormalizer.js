const skillMap = {
    "js": "JavaScript",
    "javascript": "JavaScript",
    "reactjs": "React",
    "react.js": "React",
    "node": "Node.js",
    "nodejs": "Node.js",
    "expressjs": "Express.js",
    "express": "Express.js",
    "mongodb atlas": "MongoDB"
};


function normalizeSkill(skill) {

    if (!skill) return null;

    const key = skill.trim().toLowerCase();

    return skillMap[key] || skill.trim();
}

module.exports = normalizeSkill;