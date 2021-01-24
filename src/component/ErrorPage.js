import React from "react";

class ErrorPage extends React.Component {


  render() {
    return(
      <div className="jumbotron">
        <h1>{this.props.message}</h1>
      </div>
    );
  }
}

export default ErrorPage;