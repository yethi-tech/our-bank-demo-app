const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.1.0", // Updated to a specific valid version
    info: {
      title: "Banking Application API",
      version: "1.0.0",
      description: "API documentation for the dummy banking application",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-production-url.com"
            : "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(process.cwd(), "src/app/api/**/*.js")],
};

console.log(options);

// Actually use swaggerJsdoc to generate the specs
const specs = swaggerJsdoc(options);
module.exports = specs; // Export the generated specs, not the options
