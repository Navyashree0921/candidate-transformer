function createCanonicalProfile(csv, resume) {

    return {

        fullName:
            resume.fullName ||
            csv.Name ||
            null,

        emails: [
            ...new Set([
                ...(resume.emails || []),
                csv.Email
            ].filter(Boolean))
        ],

        phones: [
            ...new Set([
                ...(resume.phones || []),
                csv.Phone
            ].filter(Boolean))
        ],

        company: csv.CurrentCompany || csv.Company || null,

        skills: [
            ...new Set([
                ...(resume.skills || [])
            ])
        ],

        projects: resume.projects || [],

        education: resume.education || []

    };

}

module.exports = createCanonicalProfile;