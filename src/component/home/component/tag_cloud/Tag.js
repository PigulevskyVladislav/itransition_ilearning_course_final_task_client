import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../css/tag.css';

class Tag extends React.Component {
  render() {
    return(
      <Link to={"/items/bytag/"+this.props.id} className="badge rounded-pill bg-primary">{this.props.name}</Link>
    );
  } 
}

export default Tag;