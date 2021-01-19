import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./component/home/Home";
import Items from "./component/Items"
import Users from "./component/Users"
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
      <Router>
        <div>
          <Header isAuthenticated={this.state.isAuthenticated}
                  login={this.state.user.login} />

          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/items/:tag_id" component={Items} />
            <Route path="/items" component={Items} />
            <Route path="/login">
              <Login updateUser={this.handleUpdateUser}
                     authenticate={this.handleAuthenticate} />
            </Route>
            <Route path="/register" component={Register}/>
            <Route path="/users" component={Users}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
