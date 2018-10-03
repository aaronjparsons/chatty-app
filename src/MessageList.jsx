import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  createMessages() {
    const messages = this.props.messages.map((message) => {
      return (
        <Message key={message.id} type={message.type} username={message.username} 
          content={message.content} image={message.image} userColor={message.userColor} 
          alternatingBg={message.alternatingBg}
        />
      );
    });
    return messages;
  }

  render() {
    const messages = this.createMessages();

    return (
      <div className='messages'>
        {messages}
      </div>
    );
  }
}
export default MessageList;