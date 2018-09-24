import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList/RoomList';
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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
