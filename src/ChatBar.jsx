import React, {Component} from 'react';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';
import Smiley from '../public/images/smiley.png';
 
//emoji set up
let jsemoji = new JSEMOJI();
jsemoji.img_set = 'emojione';
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiTrue: false,
    }
    this.handleMessage = this.handleMessage.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.emojiToggle = this.emojiToggle.bind(this);
  }
  handleMessage(e){
    if (e.keyCode === 13) {
       this.props.newMessage(this.props.currentUser, e.target.value);
       e.target.value = '';
    }
  }
  handleUsername(e) {
    if (e.keyCode === 13) {
      this.props.nameChange(e.target.value);
      // Remove the focus from the name input after hitting enter
      e.target.blur();
   }
  }

  emojiToggle() {
    const emojiState = this.state.emojiTrue;
    this.setState({emojiTrue: !emojiState});
  }

  emojiClick(emoji, data) {
    let emojiPic = jsemoji.replace_colons(`:${data.name}:`);
    document.querySelector('.chatbar-message').value += emojiPic;
  }

  createEmojiTable() {
    if (this.state.emojiTrue) {
      return (
        <div id='emoji-picker'>
          <EmojiPicker onEmojiClick={this.emojiClick} />
        </div>
      )
    }
    return null;
  }

  render() {
    const emojiTable = this.createEmojiTable();
    return (
      <div>
        <footer className='chatbar'>
          <input className="chatbar-username" 
            placeholder="Your Name (Optional)" 
            onKeyDown={this.handleUsername} 
            defaultValue={this.props.currentUser} 
          />
          <input className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
            onKeyDown={this.handleMessage}
          />
          <img id='emoji-toggle' src={Smiley} onClick={this.emojiToggle} />
        </footer>
        
        {emojiTable}
      </div>
    );
  }
}
export default ChatBar;
