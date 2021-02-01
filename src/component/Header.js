import React from "react";
import { Link } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Header extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  handleOnSearchChange = (event) => {
    this.setState({
      query: event.target.value
    });
  }

  handleShowLogin() {
    if(this.props.login) {
      return(
        <div className="collapse navbar-collapse w-100 order-2" >
            <ul className="navbar-nav ml-auto justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" to="/collections/byuser/">My Collections</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/home">{this.props.login}</a>
              </li>
            </ul>
          </div>
      );
    }
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/home">Final Task</Link>
        <div className="collapse navbar-collapse w-100 order-1" >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/items">Items</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collections">Collections</Link>
              </li>
              {this.props.isAdmin &&
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>}
            </ul>
          </div>
          {this.handleShowLogin()}
        <div className="collapse navbar-collapse w-10 order-3" >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login" 
                                      onClick={this.props.login ? this.props.logOut : null}>
                {this.props.login ?'Logout':'Login'}
              </a>
            </li>
            <li className="nav-item">
              <div className="input-group d-flex flex-row search">
                <input type="search" className="form-control rounded" placeholder="Search items"
                  aria-describedby="search-addon" onChange={this.handleOnSearchChange.bind(this)}
                  value={this.state.query} />
                <Link className="btn btn-outline-primary ml-1" to={"/items/search/".concat(this.state.query)}>Search</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withCookies(Header);