const db = require('./../db/Comments');
const stream = require('getstream');
require('dotenv').config();

module.exports.getComments = (req, res) => {
	const { userId, pitchId } = req.query;
	if(pitchId) {
		db.getCommentsByPitchId(pitchId)
		.then(results => res.send(results.rows))
		.catch(error => res.status(404).send(error));
	}else if(userId) {
		db.getCommentsByUserId(userId)
		.then(results => res.send(results.rows))
		.catch(error => res.status(404).send(error));
	} else {
		res.status(404).send('Bad request');
	}
};

module.exports.postComment = (req, res, next) => {
	const {userId, pitchId, comment} = req.body;
	console.log(req.body);
	db.createCommentInComments(userId, pitchId, comment)
	.then(results => {
		console.log('results: ', results.rows);
		//instantiate new client
		const streamClient = stream.connect(process.env.STREAM_APP_ID, process.env.STREAM_SECRET, process.env.STREAM_APP_ID);

		// instantiate the feed
		const commentFeed = streamClient.feed('comments', userId);

		const activity = {
			actor: `user:${userId}`,
			verb: 'comment',
			object: 'test', // comment ID from results,
			target: `${pitchId}`
		}

		console.log('comment activity: ', activity);

		// commentFeed.addActivity(activity)
		// 	.then(response => {
		// 		console.log(response);
		// 		res.send(results.rows);
		// 	})
		// 	.catch(reason => {
		// 		console.log('error adding activity: ', reason);
		// 	})

		res.send('successfully posted comment');
	}).catch(error => {
		res.status(404).send('failed to post comment');
	});
};

