import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 123,
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 456,
        }
      ]
    }
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(name, content) {
    const randomId = Math.random().toString(36).substr(2, 5);
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, {
      username: name,
      content: content,
      id: randomId
    }];
    this.setState({messages: newMessages});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} newMessage={this.newMessage} />
      </div>
    );
  }
}
export default App;
