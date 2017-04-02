import React, { Component } from 'react';
import { Container, Feed, Segment, Menu } from 'semantic-ui-react';

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


export default class HomeFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'followingPitches' };

    this.handleItemClick = (e, {name}) => this.setState({ activeItem: name });
  }

  render() {

    const { activeItem } = this.state;

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
  }
}

