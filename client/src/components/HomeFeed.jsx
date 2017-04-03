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
      activeComments: []
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
            date: '1 hour ago', 
            image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
            meta: '1 like',
            summary: `${comment.data.username} commented on the ${comment.data.pitchName}: "${comment.data.comment}"`
          }
        })

        this.setState({activeComments: newComments})
      })
      .then(() => {
        // enrich pitches data here
        const 
      })
  }

  render() {

    const { activeItem, activeComments } = this.state;
    if (activeComments.length > 0) {
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
                  <Menu.Item name='followingUsers' active={activeItem ==='followingUsers'} onClick={this.handleItemClick}/>
                </Menu>
              </Segment>
              <Feed events={this.state.activeComments}/>
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

