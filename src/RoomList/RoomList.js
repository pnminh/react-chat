import React, { Component } from 'react';
import './RoomList.css';
import Modal from '../Modal/Modal';
export default class RoomList extends Component {
    constructor() {
        super();
        this.state = {
            rooms: [],
            isRoomLoaded: false,
            addRoomText: ''
        }
    }
    componentDidMount() {
        this.roomRef = this.props.firebase.database().ref("rooms")
        this.roomRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: [...this.state.rooms, room], isRoomLoaded: true });
        })
    }
    submitNewRoom = () => {
        this.roomRef.push({ name: this.state.addRoomText })
    }
    addRoomTextHandler = (e) => {
        this.setState({ addRoomText: e.target.value })
    }
    openAddRoomFormHandler = () => {
        this.setState({ isFormOpen: true });
    }
    cancelSubmitNewRoom = () => {
        this.setState({ addRoomText: '', isFormOpen: false })
    }
    renderAddRoomForm() {
        if (this.state.isFormOpen) {
            return <Modal addRoomTextHandler={this.addRoomTextHandler} addRoomText={this.addRoomText}
                submitNewRoom={this.submitNewRoom} cancelSubmitNewRoom={this.cancelSubmitNewRoom} />
        }
    }

    renderPage = () => {
        if (this.state.isRoomLoaded) {
            let renderedRoomDom = []
            for (let room of this.state.rooms) {
                renderedRoomDom.push(<a key={room.key} onClick={()=>this.props.handleEnterRoom(room)} className={this.props.currentRoom===room?'selected':null}>{room.name}</a>)
            }
            return (
                <div className="sidebar">
                    <span className="floating">
                        <h1>Room List</h1>
                        <button onClick={this.openAddRoomFormHandler}>Add room</button>
                    </span>
                    {renderedRoomDom}
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderPage()}
                <div>{this.renderAddRoomForm()}</div>
            </div>
        )
    }

}