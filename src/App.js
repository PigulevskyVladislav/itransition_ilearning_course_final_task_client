import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./component/home/Home";
import Item from "./component/item/Item"
import Items from "./component/item/Items"
import Users from "./component/Users"
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";
import Collection from "./component/collection/Collection";
import Collections from "./component/collection/Collections";
import "./css/default.css";

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
      <div className="h-100 d-flex flex-column">
        <Router>
          <div>
              <Header isAuthenticated={this.state.isAuthenticated}
                      login={this.state.user.login} />
            </div>
            <div class="h-100 d-flex flex-column">
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/items/:selector/:id" component={Items} />
                <Route path="/items/:item_id" component={Item} />
                <Route path="/items" component={Items} />
                <Route path="/collections/:collection_id" component={Collection} />
                <Route path="/collections" component={Collections} />
                <Route path="/login">
                  <Login updateUser={this.handleUpdateUser}
                        authenticate={this.handleAuthenticate} />
                </Route>
                <Route path="/register" component={Register}/>
                <Route path="/users" component={Users}/>
              </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
