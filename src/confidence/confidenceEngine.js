function calculateConfidence(profile) {

    let totalFields = 6;
    let score = 0;

    if (profile.fullName) score++;
    if (profile.emails.length > 0) score++;
    if (profile.phones.length > 0) score++;
    if (profile.company) score++;
    if (profile.skills.length >= 3) score++;
    if (profile.projects.length > 0) score++;

    profile.confidence = Number((score / totalFields).toFixed(2));

    profile.fieldConfidence = {
        fullName: profile.fullName ? 1 : 0,
        emails: profile.emails.length ? 1 : 0,
        phones: profile.phones.length ? 1 : 0,
        company: profile.company ? 1 : 0,
        skills: Math.min(profile.skills.length / 10, 1),
        projects: Math.min(profile.projects.length / 3, 1)
    };

    return profile;
}

module.exports = calculateConfidence;