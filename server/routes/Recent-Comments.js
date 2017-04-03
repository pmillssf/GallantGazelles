const db = require('./../db/Comments');

module.exports.getMostRecentComments = (req, res, next) => {
  db.getRecentComments()
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => res.status(404).send(error));
};

