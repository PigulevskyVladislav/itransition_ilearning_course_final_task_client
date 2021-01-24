import React from "react";
import { Link } from "react-router-dom";
import { fetchData, getAddress } from "../../utils"

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetchData(getAddress().concat("/collections"), this.getCollections);
  }

  getCollections = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        collections: Array.from(result),
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }

  renderItems = () => {
    let items = this.state.collections;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td><Link className="nav-link" to={"/collections/".concat(item.id)}>{item.name}</Link></td>
      <td>{item.description}</td>
    </tr>
    );
    return itemRows;
  }

  render() {
    let rows;
    if (this.state.isLoaded) {
      rows = this.renderItems();
    }

    return(
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default Collections;