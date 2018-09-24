import React, { Component } from 'react';
import './MessageList.css';
import moment from 'moment';
export default class MessageList extends Component {
    constructor() {
        super();
        this.state = {
            isMessageLoaded: false,
            messages: []
        }
    }
    componentDidMount() {
        this.messageRef = this.props.firebase.database().ref("messages")
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: [...this.state.messages, message], isMessageLoaded: true });
        })
    }
    renderMessages = () => {
        if (this.state.isMessageLoaded && this.props.currentRoom) {
            let renderedMessagesDom = []
            let messagesToShow = this.state.messages.filter(message => { return message.roomId == this.props.currentRoom.key });
            for (let message of messagesToShow) {
                renderedMessagesDom.push(
                    <div key={message.key} className="message">
                        <div className="message-main">
                            <div className="bold">{message.username}</div>
                            <div>{message.content}</div>
                        </div>
                        <div className="message-time">
                            <span>{moment(new Date(message.sentAt)).format("YYYY-MM-DD HH:mm:ss")}</span>
                        </div>
                    </div>
                )
            }
            return (
                <div>
                    <h1>{this.props.currentRoom.name}</h1>
                    {renderedMessagesDom}
                </div>);
        }
        return null;
    }
    render() {
        return (
            <div className="content">
                {this.renderMessages()}
            </div>
        )
    }
}