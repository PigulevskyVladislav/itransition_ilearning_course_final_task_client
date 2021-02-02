import React from "react";
import { fetchData, getAddress, errorPage, loading } from "../../utils"

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      extraField: [],
      collectionId: '',
      collectionName: '',
      ownerName: '',
      haveExtraField: false,
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
      const { id, name, extra_field, collection_id, 
              collection_name, owner } = result;
      this.setState({
        id: id,
        name: name,
        extraField: extra_field,
        collectionId: collection_id,
        collectionName: collection_name,
        ownerName: owner,
        haveExtraField: extra_field ? true : false,
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Item loading error" },
      });
    }
  }

  renderExtraFields = () => {
    let fields = this.state.extraField;
    let itemFields = JSON.parse(fields).map((field, index) => 
      <p key={index} className="text-left"><b>{field.name}:</b> {field.value === null ? <em>empty</em> : String(field.value)}</p>  
    );
    return itemFields;
  }

  render() {
    const { haveExtraField, error, isLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <div className="container page-begin d-flex justify-content-center">
        <div className="col-4 p-3 mb-2 bg-light text-dark">
          <div className="row">
            <p className="h1 ml-4"><b>Name:</b> {this.state.name}</p>
          </div>
          <div className="col">
              <p className="text-left"><b>Collection:</b> {this.state.collectionName}</p>
              <p className="text-left"><b>Owner:</b> {this.state.ownerName}</p>     
              {haveExtraField && this.renderExtraFields()}
          </div>    
        </div>
      </div>
    );
  }
}

export default Item;