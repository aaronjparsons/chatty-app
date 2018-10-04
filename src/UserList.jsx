import React, {Component} from 'react';

class UserList extends Component {
  render() {
    const users = this.props.userList.map((user) => {
      return (<p key={user} className='user-list'>{user}</p>);
    });
    return (
      <div>
        {users}
      </div>
    );
  }
}
export default UserList;