import axios from 'axios';

function fetchingUser () {
  return {
    type: 'FETCHING_USER'
  }
}

function receivedUserProfile(userProfile) {
  return {
    type: 'RECEIVED_USER_PROFILE',
    username: userProfile[0].username,
    userProfile: userProfile[0].profile
  }
}

function receivedUserComments(comments) {
  return {
    type: 'RECEIVED_USER_COMMENTS',
    comments: comments
  }
}

function receivedUserPitches(pitches) {
  return {
    type: 'RECEIVED_USER_PITCHES',
    pitches: pitches
  }
}

function receivedUserFollows(follows) {
  return {
    type: 'RECEIVED_USER_FOLLOWS',
    follows: follows
  }
}

export function fetchUserPage(userid) {
  return (dispatch) => {
    console.log('userid: ', userid)
    dispatch(fetchingUser())
    //Fetch user profile can refactor to all promise... but not right now
    axios.get('/api/user', {
      params: {
        userId: userid
      }
    })
    .then( profile => { dispatch(receivedUserProfile(profile.data)) } )
    //Fetch comments
    axios.get('/api/comments', {
      params: {
        userId: userid
      }
    })
    .then( comments => { dispatch(receivedUserComments(comments.data)) } )
    //Fetch pitches
    axios.get('/api/pitches', {
      params: {
        q: 'user',
        userId: userid
      }
    })
    .then( pitches => { dispatch(receivedUserPitches(pitches.data)) } )
    //Fetch follows
    axios.get('/api/followers', {
      params: {
        userId: userid
      }
    })
    .then( follows => { dispatch(receivedUserFollows(follows.data)) } )
    .catch(( err => {
      console.log(err);
    }))
  }
}