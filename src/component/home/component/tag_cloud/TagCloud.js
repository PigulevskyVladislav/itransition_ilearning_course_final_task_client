import React from "react";
import Tag from "./Tag";
import 'bootstrap/dist/css/bootstrap.min.css';
import './tagCloud.css';

class TagCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getTags();
  }

  getTags = () => {
    fetch("https://localhost:44352/tags")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            tags: Array.from(result),
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
      <div className="col-6">
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