import React from "react";
import { Link } from "react-router-dom";
import { fetchData, getAddress, resultBlock } from "../utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';

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

  handleSubmit = () => {
    this.setState({
      isComplete: false,
      error: null,
    });
    fetchData(getAddress()+"/account/login/"+this.state.login+"/"+this.state.password, this.logIn);
  }

  logIn = (response) => {
    let token = response.result;
    if (token) {
      this.props.updateUser(this.state.login, this.state.password, token);
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
      <div className="container">
        <form id="loginForm">
          <div className="form-group col-lg-5 col-centered"> 
            {this.state.isComplete && resultBlock("Successful login", "success")}
            {error && resultBlock(error, "danger")}
            Login:
            <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeLogin} />
            Password:
            <input type="password" className="form-control" value={this.state.value} onChange={this.handleChangePassword} />
            <br />
            <input type="button" className="btn btn-primary" value="Login" onClick={this.handleSubmit} />
          </div>
        </form>
        <div className="d-flex flex-column mt-3">
          <p className="text-center mb-0">Have no account yet?</p>
          <Link to="/register">
            <p className="text-center">
              Register
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;