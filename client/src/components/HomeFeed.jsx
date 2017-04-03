import React, { Component } from 'react';
import { Container, Feed, Segment, Menu, Dimmer, Loader, Divider, Header, Icon } from 'semantic-ui-react';
import { fetchRecentPitchComments } from '../actions/comments.js';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeItem: 'recentComments', 
      recentComments: [],
      recentPitches: []
    };

    this.handleItemClick = (e, {name}) => this.setState({ activeItem: name });
  }

  componentDidMount() {
      const { comments, pitches } = this.props;
      // for each comment, make a get request to enrich the comment 
      const enrichedComments = comments.map(comment => axios.get('/api/stream/comments', {
        params: {
          userId: comment.user_id,
          pitchId: comment.pitch_id,
          commentId: comment.id
        }
      }));

      axios.all(enrichedComments)
      .then(results => {
        // array of objects with data
        const newComments = results.map(comment => {
          return {
            date: comment.data.timestamp, 
            image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
            meta: '0 likes',
            summary: `${comment.data.username} commented on the ${comment.data.pitchName}: "${comment.data.comment}"`
          }
        })

        this.setState({recentComments: newComments})
      })
      .then(() => {
        // enrich pitches data here
        console.log('THE PITCHES: ', pitches);
        const enrichedPitches = pitches.map(pitch => axios.get('/api/stream/pitches', {
          params: {
            userId: pitch.user_id,
            pitchId: pitch.id
          }
        }));

        axios.all(enrichedPitches)
        .then(results => {
          const newPitches = results.map(pitch => {
            return {
              date: pitch.data.timestamp,
              image: 'https://ph-files.imgix.net/8a2b7acf-d24d-46f3-9060-723db65625a9?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=120&h=120&fit=crop&dpr=2',
              meta: '0 likes',
              summary: `${pitch.data.username} created a new pitch called ${pitch.data.pitchName}. Blurb: "${pitch.data.blurb}."`
            }
          })

          this.setState({recentPitches: newPitches});
        })
      })
  }

  render() {

    const { activeItem, recentComments } = this.state;
    if (recentComments.length > 0) {
      return (
        <section>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='feed' />
              Activity Feed
            </Header>
          </Divider>
          <Divider hidden />        
          <Container text>
            <Segment basic>
              <Segment basic textAlign='center'>
                <Menu compact pointing>
                  <Menu.Item name='recentComments' active={activeItem ==='recentComments'} onClick={this.handleItemClick}/>
                  <Menu.Item name='recentPitches' active={activeItem ==='recentPitches'} onClick={this.handleItemClick}/>
                </Menu>
              </Segment>
              <Feed events={this.state[activeItem]}/>
            </Segment>
          </Container>
        </section>
      )
    } else {
      return (
        <section>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='feed' />
              Activity Feed
            </Header>
          </Divider>
          <Divider hidden /> 
        </section>
      )
    }
  }
}

export default HomeFeed

