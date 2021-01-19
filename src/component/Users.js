import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch("https://localhost:44352/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: Array.from(result),
            isLoaded: true,
          });
        },
        (error) => {
          alert("error!");
          // TODO Errors
        }
    );
  }

  renderItems = () => {
    let items = this.state.users;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td>{item.login}</td>
      <td>{item.email}</td>
      <td><input className="form-check-input" type="checkbox" checked={item.isAdmin}/></td>
    </tr>
    );
    return itemRows;
  }

  render() {
    let rows;
    if (this.state.isLoaded) {
      rows = this.renderItems();
    }

    return(
      <table className="table">
        <thead>
          <tr>
            <th>Login</th>
            <th>Email</th>
            <th>Is admin</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default Users;