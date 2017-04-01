import axios from 'axios';

function pitchFollowToggleSuccessful() {
  return {
    type: 'TOGGLE_FOLLOW'
  }
}

function pitchFollowError(error) {
  type: 'FOLLOW_ERROR',
  error
}

export function followPitch(userid, pitchid, following) {
  return (dispatch) => {
    console.log('user following: ', following);
    axios.put('/api/followers', { userid, pitchid, following })
    .then( results => dispatch(pitchFollowToggleSuccessful()))
    .catch( error => dispatch(pitchFollowError(error)))
  }
}