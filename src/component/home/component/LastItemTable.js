import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class LastItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    fetch("https://localhost:44352/items/lastadded")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: Array.from(result),
            isLoaded: true,
          });
        },
        (error) => {
          alert("error!");
          // TODO Errors
        }
      );   
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