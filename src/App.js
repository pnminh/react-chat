import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList/RoomList';
import MessageList from './MessageList/MessageList';
import User from './User/User';
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
    this.state = { currentRoom: null, currentUser: null }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }
  handleEnterRoom = (room) => {
    this.setState({ currentRoom: room });
  }
  handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleSignOut =() =>{
    firebase.auth().signOut();
  }
  
  renderAppPage = () => {
    if (!this.state.currentUser) {
      return (
        <div>
          <User currentUser={this.state.currentUser} handleSignIn={this.handleSignIn} />
        </div>
      )
    } else {
      return (
        <div>
          <User currentUser={this.state.currentUser} handleSignOut={this.handleSignOut}/>
          <RoomList firebase={firebase} handleEnterRoom={this.handleEnterRoom} currentRoom={this.state.currentRoom} />
          <MessageList firebase={firebase} currentRoom={this.state.currentRoom} />
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        {this.renderAppPage()}
      </div>
    );
  }
}

export default App;
