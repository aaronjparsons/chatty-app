import React, {Component} from 'react';
import Message from './Message.jsx';
import UserList from './UserList.jsx';

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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    // Auto scrolls to the empty div at bottom of messages
    this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messages = this.createMessages();

    return (
      <div className='message-container'>
        <div className='messages'>
          {messages}
          <div ref={scrollTarget => { this.scrollTarget = scrollTarget; }} />
        </div>
        <div className='user-list-container'>
          <UserList userList={this.props.userList} userCount={this.props.userCount} />
        </div>
      </div>
    );
  }
}
export default MessageList;