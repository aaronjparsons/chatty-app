import React, {Component} from 'react';
import { log } from 'util';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
  }
  keyPress(e){
    if(e.keyCode === 13){
       this.props.newMessage(this.props.currentUser, e.target.value);
       e.target.value = '';
    }
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.keyPress}/>
      </footer>
    );
  }
}
export default ChatBar;
