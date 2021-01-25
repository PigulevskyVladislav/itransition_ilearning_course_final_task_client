import React from "react";
import { fetchData, getAddress, errorBlock } from "../utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      error: null,
    }
  }

  handleChangeLogin = (event) => {
    this.setState({login: event.target.value});
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    fetchData(getAddress()+"/account/login/"+this.state.login+"/"+this.state.password, this.logIn);
    event.preventDefault();
  }

  logIn = (response) => {
    let token = response.result;
    if (token) {
      this.props.updateUser(this.state.login, this.state.password, token);
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
      <form className="container"  onSubmit={this.handleSubmit}>
        <div className="form-group col-lg-5 col-centered"> 
          {error && errorBlock(error)}
          Login:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeLogin} />
          Password:
          <input type="password" className="form-control" value={this.state.value} onChange={this.handleChangePassword} />
          <br />
          <input type="button" className="btn btn-primary" value="Login" onClick={this.handleSubmit} />
        </div>
      </form>
    );
  }
}

export default Login;