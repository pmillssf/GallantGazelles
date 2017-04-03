import React, { Component } from 'react';
import Video from './Video.jsx';
import MainPitchInfo from './MainPitchInfo.jsx';
import HomeFeed from './HomeFeed.jsx';
import TrendingVideos from './TrendingVideos.jsx';
import axios from 'axios';
import { Container, Dimmer, Divider, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPitches } from '../actions/pitch';
import { fetchUserPage } from '../actions/userPage';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('new props: ', this.props)
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchPitches())
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchUserPage(this.props.userid))
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    if (nextProps.userid !== this.props.userid) {
      dispatch(fetchUserPage(nextProps.userid))
    }
  }

  render() {

    const { userComments } = this.props;

    if (this.props.mainPitch.video) {

      // const test = userComments.slice(0, 5).map( (comment) => axios.get('/api/comments', { params: { pitchId: comment.pitch_id } }) );

      // axios.all(test)
      // .then(results => {
      //   console.log('AXIOS RESULTS: ', results);
      // })
      // .catch(error => {
      //   console.log('AXIOS ERROR: ', error);
      // })

      return (
        <section>
          <Video video={this.props.mainPitch.video}/>
          <Divider hidden />
          <MainPitchInfo />
          <Divider hidden />
          <HomeFeed/>
          <Divider hidden />
          <TrendingVideos />
        </section>
      )
    } else {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
          LOADING
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    pitches: state.pitches.pitches,
    mainPitch: state.pitches.mainPitch,
    userid: state.user.userid,
    userComments: state.userPage.comments
  }
}


export default connect(mapStateToProps)(App);