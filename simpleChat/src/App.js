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

  sendMessage() {
    socket.emit("message", this.state.newMessage);
    this.state.newMessage = "";
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage()
    }
  }

  render() {
    const { response } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <div>
              <MessagesView messages={this.state.messages}/>
              <input type="text" value={this.state.newMessage}
               onChange={event => this.handleChange(event)}
               onKeyPress={(e) => this.handleKeyPress(e)}/>
              <button onClick={() => this.sendMessage()}>
                Send Message
              </button>
          </div>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;
