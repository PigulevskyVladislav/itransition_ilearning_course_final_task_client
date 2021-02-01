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
import ItemsPage from "./component/item/ItemsPage"
import ItemAddPage from "./component/item/ItemAddPage"
import UsersPage from "./component/user/UsersPage"
import Login from "./component/Login";
import Header from "./component/Header";
import Register from "./component/Register";
import Collection from "./component/collection/Collection";
import CollectionsPage from "./component/collection/CollectionsPage";
import CollectionAddPage from "./component/collection/CollectionAddPage";
import UserCollectionsPage from "./component/collection/UserCollectionsPage";
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
      isAdmin: cookies.get('isAdmin'),
    }
  }

  handleUpdateUser = (login, password, token, isAdmin) => {
    const { cookies } = this.props;
    this.setState({
      login: login,
      password: password,
      token: token,
      isAdmin: Boolean(isAdmin),
    });
    cookies.set('login', login);
    cookies.set('password', password);
    cookies.set('token', token);
    cookies.set('isAdmin', this.state.isAdmin);
  }

  handleLogOut = () => {
    const { cookies } = this.props;
    this.setState({
      login: '',
      password: '',
      token: '',
      isAdmin: false,
    });
    cookies.remove('login', null);
    cookies.remove('password', null);
    cookies.remove('token', null);
    cookies.remove('isAdmin', null);
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
                <Route path="/items/add/:collection_id" component={ItemAddPage}/>
                <Route path="/items/:selector/:id" component={ItemsPage} />
                <Route path="/items/:item_id" component={Item} />
                <Route path="/items" component={ItemsPage} />
                <Route path="/collections/byuser/" component={UserCollectionsPage} />
                <Route path="/collections/add/" component={CollectionAddPage} />
                <Route path="/collections/:collection_id" component={Collection} />
                <Route path="/collections" component={CollectionsPage} />
                <Route path="/login">
                  <Login updateUser={this.handleUpdateUser} />
                </Route>
                <Route path="/register" component={Register}/>
                <Route path="/users" component={UsersPage}/>
              </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

export default withCookies(App);
