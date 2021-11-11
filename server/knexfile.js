// Update with your config settings.
const knex = require("knex")({
  client: 'sqlite3',
  connection: {
      filename: './database/apiusers.db3'
  },
  useNullAsDefault: true
});

module.exports = knex;
