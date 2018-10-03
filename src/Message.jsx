import React, {Component} from 'react';

class Message extends Component {
  setupStyles() {
    return {
      color: this.props.userColor
    }
  }

  createMessageElement() {
    let messageElement;
    const styles = this.setupStyles();
    switch(this.props.type) {
      case 'incomingMessage':
        messageElement = (
            <div className="message">
              <span className="message-username" style={styles}>{this.props.username}</span>
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
    const image = this.createImageElement();

    return(
      <div>
        {message}
        {image}
      </div>
    );
  }
}
export default Message;
