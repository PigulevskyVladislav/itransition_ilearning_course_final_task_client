import React from "react";
import { Link } from "react-router-dom";

class LastItemTable extends React.Component {
  renderItems = () => {
    let items = this.props.items;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td><Link className="nav-link" to={"/items/".concat(item.id)}>{item.name}</Link></td>
      <td>{item.collection_name}</td>
    </tr>
    );
    return itemRows;
  }

  render() {
    return(
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}

export default LastItemTable;