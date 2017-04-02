import React, { Component } from 'react';
import { Container, Feed } from 'semantic-ui-react';

const dummyData = [{
  date: '1 Hour Ago',
  image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
  meta: '1 Like',
  summary: 'theClerk liked a new pitch: "Throw coins at homeless people!"'
}, {
  date: '4 Hours Ago',
  image: 'http://react.semantic-ui.com/assets/images/avatar/small/matt.jpg',
  meta: '2 Likes',
  summary: 'theClerk commented on Example pitch: "Greed is good!"'
}]

export default class HomeFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container text>
        <Feed events ={dummyData}/>
      </Container>
    )
  }
}

