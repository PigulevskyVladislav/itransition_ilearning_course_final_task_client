import React from "react";
import Users from "./Users";
import { fetchData, getAddress, errorPage, loading } from "../../utils";

class UsersPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      users: [],
    }
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
      this.setState({ error: { message: "Users loading error" } });
    }
  }

  render() {
    const { users, error, isLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <Users users={users} />
      </div>
    );
  }
}

export default UsersPage;