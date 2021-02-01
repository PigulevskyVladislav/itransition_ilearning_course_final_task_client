import React from "react";
import Tag from "./Tag";

class TagCloud extends React.Component {
  renderItems = () => {
    let items = this.props.tags;
    let tags = items.map((item) => 
      <Tag key={item.id} id={item.id} name={item.name}/>
    );
    return tags;
  }

  render() {
    return(
      <div className="col w-100">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Tag cloud</h4>
            {this.renderItems()}
          </div>
        </div>
      </div>
    );
  }
}

export default TagCloud;