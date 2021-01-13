import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    }
  }

  handleChangeLogin = (event) => {
    this.setState({login: event.target.value});
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    alert(this.state.login);
    event.preventDefault();
  }

  render() {
    return(
      <form className="container"  onSubmit={this.handleSubmit}>
        <div className="form-group col-lg-5 col-centered"> 
          Login: {this.state.login}
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeLogin} />
          Password: {this.state.password}
          <input type="password" className="form-control" value={this.state.value} onChange={this.handleChangePassword} />
          <br />
          <input type="submit" className="btn btn-primary" value="Login" />
        </div>
      </form>
    );
  }
}

export default Login;