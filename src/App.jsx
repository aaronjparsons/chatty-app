import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0,
      userColor: null,
    }
    this.socket;
    this.nameChange = this.nameChange.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  handleIncomingMessage(data) {
    const oldMessages = this.state.messages;
    let newMessages;

    switch(data.type) {
      // Chat messages
      case 'incomingMessage':
        newMessages = [...oldMessages, {
          type: data.type,
          id: data.id,
          username: data.username,
          content: data.content,
          image: data.image,
          userColor: data.userColor,
          alternatingBg: data.alternatingBg,
        }];
        this.setState({messages: newMessages});
        break;
      // System notifications
      case 'incomingNotification':
        newMessages = [...oldMessages, {
          type: data.type,
          id: data.id,
          content: data.content,
        }];
        this.setState({messages: newMessages});
        break;
      // User count update notification
      case 'userCountUpdate':
        this.setState({userCount: data.count});
        break;
      // User color assignment
      case 'colorAssignment':
        this.setState({userColor: data.color});
        break;
      default:
        throw new Error("Unknown event type " + data.type);
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
      content: content,
      userColor: this.state.userColor,
    };
    this.socket.send(JSON.stringify(data));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    this.socket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      this.handleIncomingMessage(data);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 className="navbar-user-count">{this.state.userCount} Users Connected</h3>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} nameChange={this.nameChange} 
          newMessage={this.newMessage} 
        />
      </div>
    );
  }
}
export default App;
