provenance: [
    {
        field: "fullName",
        source: resume.fullName ? "Resume PDF" : "Recruiter CSV",
        method: "Direct Extraction"
    },
    {
        field: "company",
        source: "Recruiter CSV",
        method: "CSV Mapping"
    }
]