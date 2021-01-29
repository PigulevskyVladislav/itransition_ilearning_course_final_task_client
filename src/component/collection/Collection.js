import React from "react";
import Items from "../item/Items";
import EmptyImage from "../../resource/no_photo.png";
import { fetchData, getAddress, errorPage, loading } from "../../utils"
import "../../css/default.css";

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      owner: '',
      image: '',
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.collection_id;
    fetchData(getAddress().concat("/collections/".concat(id)), this.getCollection);
  }

  getCollection = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        id: result.id,
        name: result.name,
        description: result.description,
        owner: result.owner,
        image: result.image,
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
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
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <img src={this.state.image || EmptyImage} alt="Logo" />
          </div>
          <div className="col-sm-4">
            <p className="text-left"><b>Name:</b> {this.state.name}</p>
            <p className="text-left"><b>Descripion:</b> {this.state.description}</p>
            <p className="text-left"><b>Owner:</b> {this.state.owner}</p>                  
          </div>
        </div>
        <div className="row">
          <Items id={this.state.id} selector={"bycollection"}/>
        </div>
      </div>
    );
  }
}

export default Collection;