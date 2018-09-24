import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList/RoomList';
import MessageList from './MessageList/MessageList';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA1frwGwGej15ODJv5Zn42NkTNp_mazyfI",
  authDomain: "bloc-proj.firebaseapp.com",
  databaseURL: "https://bloc-proj.firebaseio.com",
  projectId: "bloc-proj",
  storageBucket: "bloc-proj.appspot.com",
  messagingSenderId: "934666831466"
};
firebase.initializeApp(config);
class App extends Component {
  constructor() {
    super();
    this.state = { currentRoom: null }
  }
  handleEnterRoom = (room) => {
    this.setState({ currentRoom: room });
  }
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} handleEnterRoom={this.handleEnterRoom} currentRoom={this.state.currentRoom}/>
        <MessageList firebase={firebase} currentRoom={this.state.currentRoom}/>
      </div>
    );
  }
}

export default App;
