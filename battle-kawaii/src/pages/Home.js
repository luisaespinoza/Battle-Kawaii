import React, { Component } from 'react'
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:8000');

export default class Home extends Component {
  // this.sendSocketIO = this.sendSocketIO.bind(this);

  // sendSocketIO() {
    // socket.emit('example_message', 'demo');
// }
  render() {
    return (
      <div>
        Home
        <div>
          <button onClick={this.sendSocketIO}>Send Socket.io</button>
        </div>
      </div>
    )
  }
}
