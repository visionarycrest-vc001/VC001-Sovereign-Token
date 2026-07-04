#!/usr/bin/env node
// Usage: node .github/tools/validate-json.js
// Validates JSON files in ./data against schemas in ./data/schemas
// Exits with code 1 on failure, 0 on success.

import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const dataDir = path.resolve("data");
const schemaDir = path.join(dataDir, "schemas");

const pairs = [
  ["ascension-log.json", "ascension-log.schema.json"],
  ["recalibration-queue.json", "recalibration-queue.schema.json"],
  ["vc_ledger.json", "vc_ledger.schema.json"],
  ["vcxxxx_glyphset.json", "vcxxxx_glyphset.schema.json"],
  ["watcher-metrics.json", "watcher-metrics.schema.json"],
];

let failed = false;

for (const [jsonFile, schemaFile] of pairs) {
  const jsonPath = path.join(dataDir, jsonFile);
  const schemaPath = path.join(schemaDir, schemaFile);

  if (!fs.existsSync(jsonPath)) {
    console.warn(`[skip] Missing data file: ${jsonFile}`);
    continue;
  }
  if (!fs.existsSync(schemaPath)) {
    console.error(`[error] Missing schema: ${schemaFile}`);
    failed = true;
    continue;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  } catch (err) {
    console.error(`[fail] ${jsonFile} (invalid JSON: ${err.message})`);
    failed = true;
    continue;
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  } catch (err) {
    console.error(`[fail] ${schemaFile} (invalid JSON: ${err.message})`);
    failed = true;
    continue;
  }

  let validate;
  try {
    validate = ajv.compile(schema);
  } catch (err) {
    console.error(`[fail] Could not compile schema for ${jsonFile}: ${err.message}`);
    failed = true;
    continue;
  }

  const ok = validate(data);
  if (!ok) {
    console.error(`[fail] ${jsonFile}`);
    console.error(validate.errors);
    failed = true;
  } else {
    console.log(`[ok] ${jsonFile}`);
  }
}

if (failed) {process.exit(1);}
else {process.exit(0);}
