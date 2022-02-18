require("dotenv/config");

const { DB_PORT, DB_NAME } = process.env;

module.exports = {
  App: {
    port: 3000,
    database: {
      uri: `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
    },
    logger: {
      enabled: true,
      level: "info",
    },
  },
};
