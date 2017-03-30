var pg = require('pg');
// var knex = require('../test/db/knex.js').config;

// var client = new pg.Client(knex.connection);
// console.log('database: ', knex.connection);

// client.connect();

// module.exports = client;

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
