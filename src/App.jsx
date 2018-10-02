import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.socket;
    this.nameChange = this.nameChange.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      const oldMessages = this.state.messages;
      let newMessages;

      switch(data.type) {
        case 'incomingMessage':
          newMessages = [...oldMessages, {
            type: data.type,
            id: data.id,
            username: data.username,
            content: data.content,
          }];
          this.setState({messages: newMessages});
          break;
        case 'incomingNotification':
          newMessages = [...oldMessages, {
            type: data.type,
            id: data.id,
            content: data.content,
          }];
          this.setState({messages: newMessages});
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  nameChange(name) {
    const oldName = this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous';
    this.socket.send(JSON.stringify({
      type: 'postNotification',
      content: `${oldName} changed their name to: ${name}`
    }));
    this.setState({currentUser: {name: name}});
  }

  newMessage(name, content) {
    const data = {
      type: 'postMessage',
      username: name, 
      content: content
    };
    this.socket.send(JSON.stringify(data));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} nameChange={this.nameChange} newMessage={this.newMessage} />
      </div>
    );
  }
}
export default App;
