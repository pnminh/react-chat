import React, { Component } from 'react';
export default class User extends Component {
    constructor() {
        super();

    }
    renderSignInSignOut = () => {
        if (!this.props.currentUser) {
            return (
                <div>
                    <h1>Sign in with Google</h1>
                    <button onClick={this.props.handleSignIn}>Sign in</button>
                </div>
            )
        }else{
            return (
                <div>
                    <h1>Hello {this.props.currentUser.displayName}</h1>
                    <button onClick={this.props.handleSignOut}>Sign out</button>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="signin-bar">
                {this.renderSignInSignOut()}
            </div>
        )
    }
}