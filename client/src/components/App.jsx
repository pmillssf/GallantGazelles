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
import { fetchRecentPitchComments } from '../actions/comments.js';

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
    dispatch(fetchRecentPitchComments());

  }

  render() {

    const { comments } = this.props;

    if (this.props.mainPitch.video && comments.length > 0) {

      return (
        <section>
          <Video video={this.props.mainPitch.video}/>
          <Divider hidden />
          <MainPitchInfo />
          <Divider hidden />
          <HomeFeed comments={comments}/>
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
    ...state.comments
  }
}


export default connect(mapStateToProps)(App);