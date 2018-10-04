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

  render() {
    const messages = this.createMessages();

    return (
      <div className='message-container'>
        <div className='messages'>
          {messages}
        </div>
        <div className='user-list-container'>
          <UserList userList={this.props.userList} />
        </div>
      </div>
    );
  }
}
export default MessageList;