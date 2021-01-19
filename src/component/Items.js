import React from "react";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    //window.location.reload();
    this.getItems();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.location.reload();
    }
  }

  getItems = () => {
    let tagId = this.props.match.params.tag_id || '';
    let source = "https://localhost:44352/items/".concat(tagId);
    fetch(source)
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