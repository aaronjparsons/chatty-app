import React, {Component} from 'react';

class Message extends Component {
  setupNameColor() {
    return {
      color: this.props.userColor
    }
  }

  setupContentBg() {
    if (this.props.alternatingBg) {
      return {
        backgroundColor: '#2C2B3C',
      }
    }
  }

  createMessageElement() {
    let messageElement;
    const usernameStyles = this.setupNameColor();
    switch(this.props.type) {
      case 'incomingMessage':
        messageElement = (
            <div className="message">
              <span className="message-username" style={usernameStyles}>{this.props.username}</span>
              <span className="message-content">{this.props.content}</span>
            </div>
        );
        break;
      case 'incomingNotification':
        messageElement = (
          <div className="message">
            <span className="message-system">{this.props.content}</span>
          </div>
        );
      default:
        break;
    }
    return messageElement;
  }

  createImageElement() {
    let image = null;
    if (this.props.image) {
      image = (
        <div className="message">
          <span className="message-username"></span>
          <span className="message-content"><img src={this.props.image} /></span>
        </div>);
    }
    return image;
  }

  render() {
    const message = this.createMessageElement();
    const messageStyles = this.setupContentBg();
    const image = this.createImageElement();

    return(
      <div style={messageStyles}>
        {message}
        {image}
      </div>
    );
  }
}
export default Message;
