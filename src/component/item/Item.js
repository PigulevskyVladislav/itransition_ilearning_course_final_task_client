import React from "react";
import { fetchData, getAddress, errorPage, loading } from "../../utils"

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      extraField: '',
      collectionId: '',
      collectionName: '',
      ownerName: '',
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.item_id;
    fetchData(getAddress().concat("/items/".concat(id)), this.getItem);
  }

  getItem = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        id: result.id,
        name: result.name,
        collectionId: result.collection_id,
        collectionName: result.collection_name,
        ownerName: result.owner,
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Item loading error" },
      });
    }
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <div className="col-sm-4 pt-5">
            <p className="text-left"><b>Name:</b> {this.state.name}</p>
            <p className="text-left"><b>Collection:</b> {this.state.collectionName}</p>
            <p className="text-left"><b>Owner:</b> {this.state.ownerName}</p>     
            <p className="text-left"><b>Extra Field:</b> {this.state.extraField}</p> 
          </div>
      </div>
    );
  }
}

export default Item;