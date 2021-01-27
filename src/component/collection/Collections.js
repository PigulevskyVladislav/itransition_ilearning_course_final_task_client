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
    let token = this.props.token;
    let source = getAddress().concat("/collections");
    if (token) {
      source += "/byuser/".concat(token);
    }
    fetchData(source, this.getCollections);
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
            {rows}
          </tbody>
        </table>
        {this.props.token && <Link className="btn btn-success mt-5" to={"/collections/add/".concat(this.props.token)}>Create new collection</Link>}
      </div>
    );
  }
}

export default Collections;