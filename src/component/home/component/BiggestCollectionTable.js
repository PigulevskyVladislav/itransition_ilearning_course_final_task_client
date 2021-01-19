import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class BiggestCollectionTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collections: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getCollections();
  }

  getCollections = () => {
    fetch("https://localhost:44352/collections/biggest")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            collections: Array.from(result),
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
    let items = this.state.collections;
    let itemRows = items.map((item) => 
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.count}</td>
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
            <th>Item count</th>
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

export default BiggestCollectionTable;