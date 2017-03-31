var pg = require('pg').native;
// var knex = require('../test/db/knex.js').config;
var models = require('./db/Models.js');

// client = new pg.Client(knex.connection);
// client.connect();
// module.exports = client;

pg.defaults.ssl = true;
var client = new pg.Client(process.env.ELEPHANT_SQL);
console.log(process.env.ELEPHANT_SQL);
client.connect(function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
  // client.query('DROP TABLE session, users, categories, comments, followers, investments, pitches, votes');
  // client
  //   .query(models.sessionTable);
  // client
  //   .query(models.usersTable);
  // client
  //   .query(models.categoriesTable);
  // client
  //   .query(models.commentsTable);
  // client
  //   .query(models.followersTable);
  // client
  //   .query(models.investmentsTable);
  // client
  //   .query(models.pitchesTable);
  // client
  //   .query(models.votesTable);
});



module.exports = client;
