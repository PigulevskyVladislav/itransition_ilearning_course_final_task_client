import React from "react";
import { Link } from "react-router-dom";

class Items extends React.Component {
  renderItems = () => {
    let items = this.props.items;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td><Link className="nav-link" to={"/items/".concat(item.id)}>{item.name}</Link></td>
    </tr>
    );
    return itemRows;
  }
  
  renderTable = () => {
    if (this.props.items.length !== 0) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
      );
    } else {
      return (
        <div className="alert alert-dark empty-table">
          <h1 className="font-weight-light">This table is empty</h1>
        </div>
      );
    }
  }

  render() {
    return(
      <div className="container">
        <h1>Items</h1>
        {this.renderTable()}
      </div>
    );
  }
}

export default Items;