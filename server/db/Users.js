const pg = require('pg');
const db = require('../db.js');

module.exports.getAllUsers = () => {
  return db.query("SELECT id, username, profile FROM users");
};

module.exports.getUserByUsername = (username) => {
  return db.query(`SELECT * FROM users WHERE username='${username}'`);
};

module.exports.getUserIdByUsername = (username) => {
  return db.query(`SELECT * FROM users where username='${username}';`);
};

module.exports.getUserByUserId = (userId) => {
  return db.query(`SELECT * FROM users where id=${userId};`);
};

module.exports.getUserByPitchId = (pitchId) => {
  return db.query(`SELECT users.* FROM users, followers where followers.pitch_id = ${pitchId} AND followers.user_id = users.id;`);
};

module.exports.deleteUserByUserId = (userId) => {
  return db.query(`DELETE FROM users where id = ${userId}`);
};

module.exports.deleteUserByUsername = (username) => {
  return db.query(`DELETE FROM users where username='${username}'`);
};

module.exports.createUser = (username, password, profile) => {
  return db.query(`INSERT INTO users (username, password, profile) VALUES ('${username}', '${password}', '${profile}')`);
};
module.exports.editUserProfileByUserId = (userId, profile) => {
  return db.query(`UPDATE users SET profile = '${profile}' WHERE id=${userId};`);
}

module.exports.editUserProfileByUsername = (username, profile) => {
  return db.query(`UPDATE users SET profile = '${profile}' WHERE username='${username}';`);
};

module.exports.getUserPassword = (userId) => {
  return db.query(`SELECT password FROM users where id=${userId};`);
};

module.exports.getUserPasswordByName = (username) => {
  return db.query(`SELECT password FROM users WHERE username='${username}'`);
};

module.exports.getUserProfile = (userId) => {
  return db.query(`SELECT username, profile FROM users WHERE id=${userId}`);
};

module.exports.getUsernameByUserId = (userId) => {
  return db.query(`SELECT username FROM users WHERE id='${userId}'`);
}