import React from "react";
import { fetchData, getAddress } from "../../../utils"
import 'bootstrap/dist/css/bootstrap.min.css';

class LastItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetchData(getAddress().concat("/items/lastadded"), this.getItems);
  }

  getItems = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        items: Array.from(result),
        isLoaded: true,
      });
    } else {
      this.setState({
        error: response.error,
      });
    }
  }

  renderItems = () => {
    let items = this.state.items;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.collection_name}</td>
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
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default LastItemTable;