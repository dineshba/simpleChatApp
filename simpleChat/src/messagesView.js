import React, { Component } from "react";

export default class MessagesView extends Component {
  render() {
    return(
      <div>
        {this.props.messages.map(
          (message, index) =>
          <div id={"message-" + index} key={index}>{ message.user + " : " + message.content}</div>)
        }
      </div>
    )
  }
}
