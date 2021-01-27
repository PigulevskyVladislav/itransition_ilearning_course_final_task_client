import React from "react";
import { fetchData, getAddress } from "../utils"

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetchData(getAddress().concat("/users"), this.getUsers);
  }

  getUsers = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        users: Array.from(result),
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }

  renderItems = () => {
    let items = this.state.users;
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
    let rows;
    if (this.state.isLoaded) {
      rows = this.renderItems();
    }

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
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;