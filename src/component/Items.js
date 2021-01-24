import React from "react";
import { fetchData, getAddress } from "../../utils"

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetchData(getAddress().concat("/items"), this.getItems);
  }

  getItems = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        isLoaded: true,
        items: result,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.firstName} {item.lastName}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Items;