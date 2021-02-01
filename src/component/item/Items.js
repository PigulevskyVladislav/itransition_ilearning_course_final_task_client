import React from "react";
import { Link } from "react-router-dom";
import { fetchData, getAddress } from "../../utils"

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    let id = this.props.id ? this.props.id : null;
    if (!id) {
      id = this.props.match ? this.props.match.params.id : null;
    }
    let source = getAddress().concat("/items");
    if (id) {
      let selector = this.props.selector || this.props.match.params.selector;
      source += "/".concat(selector).concat("/").concat(id);
    }
    fetchData(source, this.getItems);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.location.reload();
    }
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
        error: { message: "Collection loading error" },
      });
    }
  }

  renderItems = () => {
    let items = this.state.items;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td><Link className="nav-link" to={"/items/".concat(item.id)}>{item.name}</Link></td>
    </tr>
    );
    return itemRows;
  }

  
  renderTable = () => {
    let rows;
    if (this.state.isLoaded) {
      rows = this.renderItems();
    }
    if (this.state.items.length !== 0) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {rows}
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