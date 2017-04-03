const sessionTable = 'CREATE TABLE IF NOT EXISTS session (sid varchar(255) NOT NULL COLLATE default, sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE); ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;'

const usersTable = 'CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, username varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL, profile varchar(255) NOT NULL)';

const categoriesTable = 'CREATE TABLE IF NOT EXISTS categories (id serial PRIMARY KEY, name varchar(255) NOT NULL UNIQUE)';

const commentsTable = 'CREATE TABLE IF NOT EXISTS comments (id serial PRIMARY KEY, comment text, user_id int NOT NULL, pitch_id int NOT NULL, timestamp timestamp DEFAULT current_timestamp)';

const followersTable = 'CREATE TABLE IF NOT EXISTS followers (id serial PRIMARY KEY, user_id int, pitch_id int)';

const investmentsTable = 'CREATE TABLE IF NOT EXISTS investments (id serial PRIMARY KEY, user_id int, pitch_id int)';

const pitchesTable = 'CREATE TABLE IF NOT EXISTS pitches (id serial PRIMARY KEY, name varchar(255) NOT NULL UNIQUE, video varchar(255), website varchar(255), profile varchar(255), blurb text, category_id int, investment_status boolean DEFAULT false, timestamp timestamp DEFAULT current_timestamp)';

const votesTable = 'CREATE TABLE IF NOT EXISTS votes (id serial PRIMARY KEY, user_id int, pitch_id int, vote_type int DEFAULT 0, timestamp timestamp DEFAULT current_timestamp)';

module.exports = {
  sessionTable: sessionTable,
  usersTable: usersTable,
  categoriesTable: categoriesTable,
  commentsTable: commentsTable,
  followersTable: followersTable,
  investmentsTable: investmentsTable,
  pitchesTable: pitchesTable,
  votesTable: votesTable
}