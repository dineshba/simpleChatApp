import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1:4001");
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
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
render() {
    const { response } = this.state;
    const sendMessage = () => socket.emit("message", "hi");
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <div>
              {this.state.messages.map((message, index) => <div key={index}>{message}</div>)}
              <button onClick={sendMessage}>
                Send Message
              </button>
          </div>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;
