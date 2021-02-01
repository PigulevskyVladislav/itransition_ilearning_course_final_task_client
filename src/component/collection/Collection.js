import React from "react";
import { Link } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Items from "../item/Items";
import EmptyImage from "../../resource/no_photo.png";
import { fetchData, getAddress, errorPage, loading } from "../../utils"
import "../../css/default.css";

class Collection extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      ownerId: '',
      owner: '',
      image: '',
      items: [],
      canModify: false,
      isItemsLoaded: false,
      isCoollectionLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    let id = this.props.match.params.collection_id;
    fetchData(getAddress().concat("/collections/".concat(id)), this.getCollection);
    fetchData(getAddress().concat("/items/").concat("bycollection/").concat(id), this.getItems);
  }

  getCollection = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        id: result.id,
        name: result.name,
        description: result.description,
        ownerId: result.owner_id,
        owner: result.owner,
        image: result.image,
        isCoollectionLoaded: true,
      });
      this.checkCanModify();
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }

  getItems = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        items: Array.from(result),
        isItemsLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Items loading error" },
      });
    }
  }

  checkCanModify = () => {
    const { cookies } = this.props;
    let isAdmin = cookies.get('isAdmin') === 'true';
    let isOwner = this.checkIsOwner(cookies);
    if (isOwner || isAdmin) {
      this.setState({ canModify: true })
    }
  }

  checkIsOwner = (cookies) => {
    return cookies.get('token') === String(this.state.ownerId);
  }

  render() {
    const { id, items, error, isCoollectionLoaded, isItemsLoaded } = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!(isCoollectionLoaded && isItemsLoaded)) {
      return loading();
    } else 
    return(
      <div className="container page-begin">
        <div className="row">
          <div className="col-sm-4 d-flex justify-content-center">
            <img className="img-fluid collection-image" src={this.state.image || EmptyImage} alt="Logo" />
          </div>
          <div className="col-sm-4 pt-5">
            <p className="text-left"><b>Name:</b> {this.state.name}</p>
            <p className="text-left"><b>Descripion:</b> {this.state.description}</p>
            <p className="text-left"><b>Owner:</b> {this.state.owner}</p>      
            {this.state.canModify && 
              <Link className="btn btn-success mt-5" to={"/items/add/".concat(id)}>Create new item</Link>}            
          </div>
        </div>
        <div className="row">
          <Items items={items} selector={"bycollection"}/>
        </div>
      </div>
    );
  }
}

export default withCookies(Collection);