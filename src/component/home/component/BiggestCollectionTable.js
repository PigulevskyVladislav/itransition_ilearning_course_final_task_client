import React from "react";
import { Link } from "react-router-dom";

class BiggestCollectionTable extends React.Component {
  renderItems = () => {
    let items = this.props.collections;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td><Link className="nav-link" to={"/collections/".concat(item.id)}>{item.name}</Link></td>
      <td>{item.count}</td>
      <td>{item.description}</td>
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
            <th>Item count</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}

export default BiggestCollectionTable;