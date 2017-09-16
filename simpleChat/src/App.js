import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import MessagesView from './messagesView'

const socket = socketIOClient("http://127.0.0.1:4001");
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      newMessage: "",
      user: "",
      confirmedUser: "",
      messages: []
    };
  }

  componentDidMount() {
    socket.on("connection", data => {
      this.setState({ response: data })
    });
    socket.on("message", data => {
      this.state.messages.push(data)
      this.setState({message: this.state.messages})
    });
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  handleUser(event) {
   this.setState({user: event.target.value});
  }

  sendMessage() {
    socket.emit("message", {user: this.state.confirmedUser, content: this.state.newMessage});
    this.setState({message: ""})
  }

  handleKeyPress(e, func) {
    if (e.key === 'Enter') {
      func()
    }
  }

  setUser(name) {
    this.setState({confirmedUser: this.state.user})
    this.setState({user: ""})
  }

  render() {
    const { response } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <div>
              {this.state.confirmedUser ?
              <span>
                <MessagesView messages={this.state.messages} user={this.state.confirmedUser}/>
                <input type="text" value={this.state.newMessage}
                 onChange={event => this.handleChange(event)}
                 onKeyPress={(e) => this.handleKeyPress(e, () => this.sendMessage())}/>
                <button onClick={() => this.sendMessage()}>
                  Send Message
                </button>
              </span>
              : <span>
                <input type="text" value={this.state.user}
                 onChange={event => this.handleUser(event)}
                 onKeyPress={(e) => this.handleKeyPress(e, () => this.setUser())}/>
                <button onClick={() => this.setUser()}>
                  Who are you?
                </button>
              </span>}
          </div>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;
