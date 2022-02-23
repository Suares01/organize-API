require("dotenv/config");

const { DB_PORT, DB_NAME, TOKEN_SECRET } = process.env;

module.exports = {
  App: {
    port: 3000,
    database: {
      uri: `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
    },
    auth: {
      secret: `${TOKEN_SECRET}`,
    },
    logger: {
      enabled: true,
      level: "info",
    },
  },
};
