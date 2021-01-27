import React from "react";
import { Link } from "react-router-dom";
import { fetchData, getAddress, resultBlock } from "../utils";
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
      error: null,
      isComplete: false,
    }
  }

  handleSetLogin = (event) => {
    this.setState({login: event.target.value});
  }

  handleSetPassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSetEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleSubmit = (event) => {
    this.setState({
      isComplete: false,
      error: null,
    });
    fetchData(getAddress()+"/account/adduser/"+this.state.login+"/"+this.state.email+"/"+this.state.password, this.registerUser);
    event.preventDefault();
  }

  registerUser = (response) => {
    let token = response.result;
    if (token) {
      this.setState({isComplete: true});
    } else {
      let error = response.error;
      let message = error ? error.message : "Incorrect data entered or user already exists";
      this.setState({
        error: message
      });
    }
  }

  render() {
    let error = this.state.error;
    return(
      <form id="registerForm" className="container"  onSubmit={this.handleSubmit}>
        <div className="form-group col-lg-5 col-centered col-to-center"> 
          {this.state.isComplete && resultBlock("Successful user addition", "success")}
          {error && resultBlock(error, "danger")}
          Login:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleSetLogin} />
          Password:
          <input type="password" className="form-control" value={this.state.value} onChange={this.handleSetPassword} />
          Email:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleSetEmail} />
          <br />
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
        <div className="d-flex flex-column mt-3">
          <p className="text-center mb-0">Already have account?</p>
          <Link to="/login">
            <p className="text-center">
              Login
            </p>
          </Link>
        </div>
      </form>
    );
  }
}

export default Register;