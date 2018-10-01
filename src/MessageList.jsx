import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className='messages'>
        <Message />
      </div>
    );
  }
}
export default MessageList;