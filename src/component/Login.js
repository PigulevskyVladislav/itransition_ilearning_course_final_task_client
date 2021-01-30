import React from "react";
import { Link } from "react-router-dom";
import { fetchData, getAddress, resultBlock } from "../utils";
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      error: null,
      isComplete: false,
    }
  }

  handleChangeLogin = (event) => {
    this.setState({login: event.target.value});
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({
      isComplete: false,
      error: null,
    });
    fetchData(getAddress()+"/account/login/"+this.state.login+"/"+this.state.password, this.logIn);
    event.preventDefault();
  }

  logIn = (response) => {
    let result = JSON.parse(response.result);
    let token = result.user_id;
    let isAdmin = Boolean(result.isAdmin);
    if (token) {
      this.props.updateUser(this.state.login, this.state.password, token, isAdmin);
      this.setState({isComplete: true});
    } else {
      let error = response.error;
      let message = error ? error.message : "Wrong login or password";
      this.setState({
        error: message
      });
    }
  }

  render() {
    let error = this.state.error;
    return(
        <form id="loginForm" className="container page-begin" onSubmit={this.handleSubmit}>
          <div className="form-group col-lg-5 col-centered col-to-center"> 
            {this.state.isComplete && resultBlock("Successful login", "success")}
            {error && resultBlock(error, "danger")}
            Login:
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeLogin} />
            Password:
            <input type="password" className="form-control" value={this.state.value} onChange={this.handleChangePassword} />
            <br />
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
          <div className="d-flex flex-column mt-3">
            <p className="text-center mb-0">Have no account yet?</p>
            <Link to="/register">
              <p className="text-center">
                Register
              </p>
            </Link>
          </div>
        </form>
    );
  }
}

export default Login;