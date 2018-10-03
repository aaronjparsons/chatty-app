import React, {Component} from 'react';

class Message extends Component {
  render() {
    const styles = {
      color: this.props.userColor
    }
    let image = null;
    if (this.props.image) {
      image = (<div className="message">
                <span className="message-username"></span><span className="message-content"><img src={this.props.image} /></span>
              </div>);
    }
    if (this.props.type === 'incomingMessage') {
      return (
        <div>
          <div className="message">
            <span className="message-username" style={styles}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
          {image}
        </div>
      )
    } else {
      return (
        <div className="message">
          <span className="message-system">{this.props.content}</span>
        </div>
      )
    }
  }
}
export default Message;
