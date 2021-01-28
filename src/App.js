import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Home from "./component/home/Home";
import Item from "./component/item/Item"
import Items from "./component/item/Items"
import Users from "./component/Users"
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";
import Collection from "./component/collection/Collection";
import Collections from "./component/collection/Collections";
import UserCollectionsPage from "./component/collection/UserCollectionsPage";
import CollectionAddPage from "./component/collection/CollectionAddPage";
import "./css/default.css";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      login: cookies.get('login'),
      password: cookies.get('password'),
      token: cookies.get('token'),
    }
  }

  handleUpdateUser = (login, password, token) => {
    const { cookies } = this.props;
    this.setState({
      login: login,
      password: password,
      token: token,
    });
    cookies.set('login', login);
    cookies.set('password', password);
    cookies.set('token', token);
  }

  handleLogOut = () => {
    const { cookies } = this.props;
    this.setState({
      login: '',
      password: '',
      token: '',
    });
    cookies.remove('login', null);
    cookies.remove('password', null);
    cookies.remove('token', null);
  }

  render() {
    return (
      <div className="h-100 d-flex flex-column">
        <Router>
          <div>
              <Header login={this.state.login}
                      logOut={this.handleLogOut} />
            </div>
            <div className="h-100 d-flex flex-column">
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/items/:selector/:id" component={Items} />
                <Route path="/items/:item_id" component={Item} />
                <Route path="/items" component={Items} />
                <Route path="/collections/byuser/:token" component={UserCollectionsPage} />
                <Route path="/collections/add/:token" component={CollectionAddPage} />
                <Route path="/collections/:collection_id" component={Collection} />
                <Route path="/collections" component={Collections} />
                <Route path="/login">
                  <Login updateUser={this.handleUpdateUser} />
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

export default withCookies(App);
