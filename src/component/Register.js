import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
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
    // TODO: register user
    event.preventDefault();
  }

  render() {
    return(
      <form className="container"  onSubmit={this.handleSubmit}>
        <div className="form-group col-lg-5 col-centered"> 
          Login:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleSetLogin} />
          Password:
          <input type="password" className="form-control" value={this.state.value} onChange={this.handleSetPassword} />
          Email:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleSetEmail} />
          <br />
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>
    );
  }
}

export default Register;