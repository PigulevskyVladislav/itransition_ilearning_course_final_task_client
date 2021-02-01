import React from "react";
import Items from "./Items";
import { fetchData, getAddress, errorPage, loading } from "../../utils"

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: false,
    };
  }

  componentDidMount() {
    let source = getAddress().concat("/items");
    let id = this.props.match.params.id;
    let selector = this.props.match.params.selector;
    let query = this.props.match.params.query;
    if (id && selector) {
      source += "/".concat(selector).concat("/").concat(id);
    }
    if (query) {
      source += "/search/".concat(query);
    }
    fetchData(source, this.getItems);
  }

  componentDidUpdate(prevProps) {
    if(!(this.props == prevProps)) {
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
        error: { message: "Items loading error" },
      });
    }
  }

  render() {
    const { items, error, isLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <Items items={items} />
      </div>
    );
  }
}

export default ItemsPage;