# Candidate Data Transformer

A Node.js application that transforms structured (Recruiter CSV) and unstructured (Resume PDF) candidate data into a unified canonical profile.

## Features

- Recruiter CSV parsing
- Resume PDF parsing
- Phone normalization (E.164)
- Email normalization
- Canonical skill normalization
- Merge Engine
- Conflict Resolution
- Confidence Scoring
- Projection Layer (config.json)
- JSON Schema Validation
- Upload Interface using Express & Multer

## Tech Stack

- Node.js
- Express.js
- Multer
- pdf-parse
- csv-parser


## Folder Structure

```
candidate-transformer/
│
├── input/
│   ├── recruiter.csv
│   └── resume.pdf
│
├── output/
│   └── finalProfile.json
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── uploads/
│
├── src/
│   ├── app.js
│   ├── parser/
│   ├── extractor/
│   ├── merger/
│   ├── normalizer/
│   ├── transformer/
│   ├── confidence/
│   ├── projector/
│   ├── validator/
│   └── utils/
│
├── config.json
├── schema.json
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

Open

```
http://localhost:3000
```

Upload:

- Recruiter CSV
- Resume PDF

Click **Transform** to generate the canonical profile.

Output is also saved to

```
output/finalProfile.json
```

## Pipeline

CSV + Resume
  ↓
Parse
  ↓
Extract
  ↓
Normalize
  ↓
Merge
  ↓
Confidence
  ↓
Projection
  ↓
Validation
  ↓
Canonical JSON
