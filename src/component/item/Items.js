import React from "react";
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
    let id = this.props.id || this.props.match.params.id;
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
      <td>{item.name}</td>
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
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default Items;