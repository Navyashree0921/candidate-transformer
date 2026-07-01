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
src/
 parser/
 extractor/
 merger/
 normalizer/
 transformer/
 confidence/
 projector/
 validator/

public/
uploads/
input/
output/
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
