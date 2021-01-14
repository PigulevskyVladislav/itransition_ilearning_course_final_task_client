import React from "react";
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {},
    }
  }

  handleUpdateUser = (login, password) => {
    let user = this.state.user;
    user.login = login;
    user.password = password;
    this.setState({
      user: user,
    });
  }

  handleAuthenticate = (isLogin) => {
    this.setState({
      isAuthenticated: isLogin,
    });
  }

  render() {
    return (
      <div>
        <Header isAuthenticated={this.state.isAuthenticated}
                login={this.state.user.login} />

        <Register />

        {/*<Login updateUser={this.handleUpdateUser}
               authenticate={this.handleAuthenticate} />*/}
      </div>
    );
  }
}

export default App;
