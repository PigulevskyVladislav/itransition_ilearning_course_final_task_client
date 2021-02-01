import React from "react";

class Users extends React.Component {
  renderItems = () => {
    let items = this.props.users;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td>{item.login}</td>
      <td>{item.email}</td>
      <td><input className="form-check-input" type="checkbox" checked={item.isAdmin} onChange={e => {}}/></td>
    </tr>
    );
    return itemRows;
  }

  render() {
    return(
      <div className="container">
        <h1>Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Login</th>
              <th>Email</th>
              <th>Is admin</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;