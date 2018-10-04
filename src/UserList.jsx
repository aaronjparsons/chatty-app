import React, {Component} from 'react';

class UserList extends Component {
  render() {
    const users = this.props.userList.map((user) => {
      return (<p key={user}>{user}</p>);
    });
    return (
      <div>
        {users}
      </div>
    );
  }
}
export default UserList;