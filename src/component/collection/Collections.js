import React from "react";
import { Link } from "react-router-dom";
import { withCookies } from 'react-cookie';

class Collections extends React.Component {
  renderItems = () => {
    let items = this.props.collections;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td><Link className="nav-link" to={"/collections/".concat(item.id)}>{item.name}</Link></td>
      <td>{item.description}</td>
    </tr>
    );
    return itemRows;
  }

  render() {
    return(
      <div className="container">
        <h1>Collections</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
        {this.props.token && <Link className="btn btn-success mt-5" to={"/collections/add/"}>Create new collection</Link>}
      </div>
    );
  }
}

export default withCookies(Collections);