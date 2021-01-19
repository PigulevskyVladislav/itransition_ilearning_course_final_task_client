import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTagClick = (event) => {
    alert(this.props.name);
    // TODO Tag click
  }

  render() {
    return(
      <span className="badge rounded-pill bg-primary" onClick={this.handleTagClick}>{this.props.name}</span>
    );
  }
}

export default Tag;