// drizzle.config.js
export default {
  dialect: "postgresql", // Database dialect (NeonDB is compatible with PostgreSQL)
  schema: "./utils/schema.jsx", // Your schema file (adjust path if necessary)
  out: "./drizzle", // Directory to output generated migrations
  dbCredentials: {
    // Update to NeonDB's connection string
    url: "postgresql://finance_owner:8yOdgbNZAV5k@ep-bold-glade-a1erq4fz.ap-southeast-1.aws.neon.tech/finance?sslmode=require", // NeonDB connection string
    connectionString:
      "postgresql://finance_owner:8yOdgbNZAV5k@ep-bold-glade-a1erq4fz.ap-southeast-1.aws.neon.tech/finance?sslmode=require", // Same connection string for consistency
  },
};