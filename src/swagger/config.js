const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

// Load the base OpenAPI spec
const baseSpec = yaml.load(
  fs.readFileSync(
    path.join(process.cwd(), "src/swagger/ourbank-api.yml"),
    "utf8"
  )
);

// Combine everything
const fullSpec = {
  ...baseSpec,
};

module.exports = fullSpec;
