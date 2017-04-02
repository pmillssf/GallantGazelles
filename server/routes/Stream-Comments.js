const dbComments = require('./../db/Comments');
const dbPitches = require('./../db/Pitches');
const dbUsers = require('./../db/Users');

module.exports.commentEnrichment = (req, res) => {
  const { userId, pitchId, commentId } = req.query;
  var username;
  var pitchName;
  var comment;
  dbUsers.getUsernameByUserId(userId)
  .then((results) => {
    username = results.rows[0].username;
    dbPitches.getPitchName(pitchId).then((results) => {
      pitchName = results.rows[0].name;
      dbComments.getCommentByCommentId(commentId).then((results) => {
        comment = results.rows[0].comment;
        res.send(JSON.stringify({username: username, pitchName: pitchName, comment: comment}));
      })
    })
  }).catch(error => res.status(404).send(error));
};


