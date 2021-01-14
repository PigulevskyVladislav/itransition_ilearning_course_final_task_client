import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
  handleShowLogin() {
    if(this.props.isAuthenticated) {
      return(
        <li className="nav-item">
          <a className="nav-link" href="#">{this.props.login}</a>
        </li>
      );
    }
  }

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Final Task</a>
        <div className="collapse navbar-collapse w-100 order-1" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse order-2" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.handleShowLogin()}
            <li className="nav-item">
              <a className="nav-link" href="#">{this.props.isAuthenticated ?'Logout':'Login'}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;