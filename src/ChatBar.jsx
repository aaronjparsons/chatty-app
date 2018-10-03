import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }
  handleMessage(e){
    if (e.keyCode === 13) {
       this.props.newMessage(this.props.currentUser, e.target.value);
       e.target.value = '';
    }
  }
  handleUsername(e) {
    if (e.keyCode === 13) {
      console.log('Name changed');
      this.props.nameChange(e.target.value);
      // Remove the focus from the name input after hitting enter
      e.target.blur();
   }
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown={this.handleUsername} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.handleMessage}/>
      </footer>
    );
  }
}
export default ChatBar;
