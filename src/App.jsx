import React, {Component} from 'react';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Message />
        <ChatBar />
      </div>
    );
  }
}
export default App;
