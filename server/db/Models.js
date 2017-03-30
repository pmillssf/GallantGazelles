const sessionTable = 'CREATE TABLE session (sid varchar(255) NOT NULL COLLATE default, sess json NOT NULL, expire timestamp(6) NOT NULL) WITH (OIDS=FALSE); ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;'

const usersTable = 'CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL, profile varchar(255) NOT NULL)';

const categoriesTable = 'CREATE TABLE categories (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL UNIQUE)';

const commentsTable = 'CREATE TABLE comments (id int NOT NULL AUTO_INCREMENT, comment longtext, user_id int NOT NULL, pitch_id int NOT NULL, timestamp timestamp)';

const followersTable = 'CREATE TABLE followers (id int NOT NULL AUTO_INCREMENT, user_id int, pitch_id int)';

const investmentsTable = 'CREATE TABLE investments (id int NOT NULL AUTO_INCREMENT, user_id int, pitch_id int)';

const pitchesTable = 'CREATE TABLE pitches (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL UNIQUE, video varchar(255), website varchar(255), profile varchar(255), blurb longtext, category_id int, investment_status boolean DEFAULT false)';

const votesTable = 'CREATE TABLE votes (id int NOT NULL AUTO_INCREMENT, user_id int, pitch_id int, vote_type int DEFAULT 0, timestamp timestamp)';

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