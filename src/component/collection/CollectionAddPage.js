import React from "react";
import { fetchData, getAddress, resultBlock } from "../../utils";

class CollectionAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      token: this.props.token,
      types: [],
    }
  }

  render() {
    let error = this.state.error

    return(
      <form className="container" onSubmit={this.handleSubmit}>
        <div className="form-group col-lg-5 col-centered col-to-center"> 
          Name:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeLogin} />
          Type:
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          Description:
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChangeLogin} />
          Upload image:
          <div class="file-upload-wrapper">
            <input type="file" id="input-file-now" class="file-upload" />
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Create collection" />
          {error && resultBlock(error, "danger")}
        </div>
      </form>
    );
  }
}

export default CollectionAddPage;