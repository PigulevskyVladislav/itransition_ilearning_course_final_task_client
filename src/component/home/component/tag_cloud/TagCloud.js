import React from "react";
import Tag from "./Tag";
import { fetchData, getAddress } from "../../../../utils"
import 'bootstrap/dist/css/bootstrap.min.css';

class TagCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetchData(getAddress().concat("/tags"), this.getTags);
  }

  getTags = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        tags: Array.from(result),
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }  

  renderItems = () => {
    let items = this.state.tags;
    let itemRows = items.map((item) => 
    <Tag key={item.id} id={item.id} name={item.name}/>
    );
    return itemRows;
  }

  render() {
    let tags;
    if (this.state.isLoaded) {
      tags = this.renderItems();
    }

    return(
      <div className="col w-100">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Tag cloud</h4>
            {tags}
          </div>
        </div>
      </div>
    );
  }
}

export default TagCloud;