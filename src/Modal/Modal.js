import React, { Component } from 'react';
import './Modal.css';
export default class Modal extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div className="modal">
                <h1>Add New Room</h1>
                <h2>Enter room name:</h2>
                <input type="text" placeholder="New Room..." onChange={this.props.addRoomTextHandler} value={this.props.addRoomText}></input>
                <button onClick={this.props.submitNewRoom}>Submit</button>
                <button onClick={this.props.cancelSubmitNewRoom}>Cancel</button>
            </div>
        )
    }
}