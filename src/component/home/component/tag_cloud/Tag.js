import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../css/tag.css';

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
      <Link to={"/items/"+this.props.id} className="badge rounded-pill bg-primary">{this.props.name}</Link>
    );
  } 
}

export default Tag;