const db = require('./../db/Pitches');

module.exports.getMostRecentPitches = (req, res, next) => {
  db.getRecentPitches()
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => res.status(404).send(error));
};

