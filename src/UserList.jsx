import React, {Component} from 'react';

function UserList(props) {
    const users = props.userList.map((user) => {
      return (<p key={user} className='user-list'>{user}</p>);
    });

    return (
      <div>
        <div className='user-list-header'>{props.userCount} User(s) Online</div>
        {users}
      </div>
    );
}
export default UserList;