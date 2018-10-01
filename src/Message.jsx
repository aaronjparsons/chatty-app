import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}
export default Message;
