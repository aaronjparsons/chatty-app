import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.socket;
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.addEventListener('open', (event) => {
      console.log('connected to the server');
    });
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event);
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, {
        id: data.id,
        username: data.username,
        content: data.content,
      }];
      this.setState({messages: newMessages});
    }
  }

  newMessage(name, content) {
    const data = {username: name, content: content};
    this.socket.send(JSON.stringify(data));
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
