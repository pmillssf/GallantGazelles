import React, { Component } from 'react';
import { Container, Feed, Segment, Menu } from 'semantic-ui-react';
import { fetchRecentPitchComments } from '../actions/comments.js';
import { connect } from 'react-redux';

const dummyData = {
  followingPitches: [{
    date: '1 Hour Ago',
    image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
    meta: '1 Like',
    summary: 'theClerk liked a new pitch: "Throw coins at homeless people!"'
  }, {
    date: '4 Hours Ago',
    image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
    meta: '2 Likes',
    summary: 'theClerk commented on Example pitch: "Greed is good!"'
  }],
  followingUsers: [{
    date: '8 Hours Ago',
    image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
    meta: '4 Likes',
    summary: 'the Clerk killed a homeless person!'
  }]
}


class HomeFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'followingPitches', 
      activeComments: dummyData.followingPitches
    };

    this.handleItemClick = (e, {name}) => this.setState({ activeItem: name });

    console.log('we have the feed!', this.props.comments);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchRecentPitchComments());
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    if (nextProps.comments !== this.props.comments) {
      dispatch(fetchRecentPitchComments());
    }
  }

  {
    id,
    comment,
    user_id,
    pitch_id,
    timestamp
  }

  render() {

    const { activeItem } = this.state;

    if (this.props.comments.length > 0) {
      const { comments } = this.props.comments;

      // for each comment, make a get request to enrich the comment 
      const enriched = comments.map(comment => axios.get('/api/stream/comments', {
        params: {
          userId: comment.user_id,
          pitchId: comment.pitch_id,
          commentId: id
        }
      }));

      axios.all(enriched)
      .then(results => {
        console.log(results);
      })

      return (
        <Container text>
          <Segment basic>
            <Segment basic textAlign='center'>
              <Menu compact pointing>
                <Menu.Item name='followingPitches' active={activeItem ==='followingPitches'} onClick={this.handleItemClick}/>
                <Menu.Item name='followingUsers' active={activeItem ==='followingUsers'} onClick={this.handleItemClick}/>
              </Menu>
            </Segment>
            <Feed events={dummyData[activeItem]}/>
          </Segment>
        </Container>
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
    ...state.comments
  }
}

export default connect(mapStateToProps)(HomeFeed)

