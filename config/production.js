const { PORT, DB_USER, DB_NAME, DB_PASS } = process.env;

module.exports = {
  App: {
    port: PORT || 8080,
    database: {
      uri: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.crgcq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    },
  },
};
