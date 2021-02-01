import React from "react";
import Collections from "./Collections";
import { fetchData, getAddress, errorPage, loading } from "../../utils"

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    let source = getAddress().concat("/collections");
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

  render() {
    const { collections, error, isLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <Collections collections={collections} />
      </div>
    );
  }
}

export default CollectionsPage;