const router = require('express').Router();
const Users = require('./routes/Users');
const Followers = require('./routes/Followers');
const Pitches = require('./routes/Pitches');
const Categories = require('./routes/Categories');
const Comments = require('./routes/Comments');
const Votes = require('./routes/Votes');
// cosnt Sessions = require('./roues/Sessions');
// const Categories = require('./routes/Categories');

// Rest API to /api

router.post('/testSession', (req, res) => {
	console.log('session in post request: ',req.session.pitchmeio);
	res.send('haha');
});

// USERS
//Get all users
router.get('/users', Users.getUsers);

//Create new User
router.post('/users', Users.postUsers);

//Edit User information
router.put('/users', Users.putUsers);

//Remove User from DB
router.delete('/users', Users.deleteUserByName);

// COMMENTS
router.get('/comments', Comments.getComments);
router.post('/comments', Comments.postComment);
// router.put('/comments', comments.something.put);
// router.delete('/comments', comments.something.delete);

// PITCHES
router.get('/pitches', Pitches.getPitches);
router.post('/pitches', Pitches.postPitches);
router.put('/pitches', Pitches.putPitches);
router.delete('/pitches', Pitches.deletePitches);

// CATEGORIES

router.get('/categories', Categories.getCategories);

// FOLLOWERS
router.get('/followers', Followers.getFollowers);
router.post('/followers', Followers.postFollower);
router.delete('/followers', Followers.removeFollower);
//VOTES:
router.get('/votes', Votes.getVoteByUsername);
	//query from db on whether this user voted for this specific pitch or not.
// })

module.exports = router;