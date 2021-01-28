import React from "react";
import FormErrors from "../FormErrors"
import { fetchData, getAddress, errorPage, resultBlock, loading } from "../../utils";
import { EXCLUDE_ROW } from "@blueprintjs/icons/lib/esm/generated/iconContents";

class CollectionAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      image: null,
      imageName: '',
      token: this.props.token,
      types: [],
      error: null,
      formErrors: {name: '', description: ''},
      nameValid: false,
      descriptionValid: true,
      formValid: false,
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetchData(getAddress().concat("/collections/types"), this.getTypes);
  }

  getTypes = (response) => {
    let result = response.result;
    if (result) {
      this.setState({
        types: Array.from(result),
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection type loading error" },
      });
    }
  }

  onFileInputChange = (event) => {
    let file = event.target.files[0];
    this.setState({
      image : URL.createObjectURL(file),
      imageName: file.name,
    });
  }

  handleUserInput (event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  removeImage = () => {
    this.setState({
      image: null,
      imageName: '',
    });
  }

  handleSubmit = () => {
    alert("COOL");
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }

  validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let nameValid = this.state.nameValid;
      let descriptionValid = this.state.descriptionValid;
    switch(fieldName) {
        case 'name':
          nameValid = value.length >= 3 && value.length <= 25;
          fieldValidationErrors.name = nameValid ? '' : ' must have 3-25 chars';
          break;
        case 'description':
          descriptionValid = value.length <= 100;
          fieldValidationErrors.description = descriptionValid ? '': ' must have 0-100 chars';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      nameValid: nameValid,
                      descriptionValid: descriptionValid
                    }, this.validateForm);
    }
    validateForm() {
      this.setState({formValid: this.state.nameValid &&
                                this.state.descriptionValid});
  }

  renderDropdown() {
    let image = this.state.image;
    if (image) {
      return(
        <div className="position-relative">
          <button type="button" 
                  className="close p-2 position-absolute" 
                  aria-label="Close"
                  onClick={this.removeImage} >
              <span aria-hidden="true">&times;</span>
            </button>
          <img src={image} alt={this.state.imageName} onDragStart={this.preventDragHandler} className="img-fluid" />
        </div>
      );
    } else {
      return(
        <div className="file-upload-wrapper">
          <input type="file" id="input-file-now" className="file-upload" onChange={this.onFileInputChange}/>
        </div>
      );
    }
  }

  renderOptions() {
    let types = this.state.types;
    let options = types.map((item) => 
    <option key={item.id} value={item.id}>{item.name}</option>
    );
    return options;
  }

  render() {
    const { error, isLoaded, formErrors, formValid} = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <form className="container" onSubmit={this.handleSubmit}>
        <div className={"form-group col-lg-5 col-centered col-to-center ".concat(this.errorClass(!this.state.formValid))}> 
          
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleUserInput.bind(this)} />
          Type:
          <select className="custom-select" id="inputGroupSelect01" defaultValue="1">
            {this.renderOptions()}
          </select>
          <label htmlFor="name">Description:</label>
          <input type="text" name="description" value={this.state.description} className="form-control" onChange={this.handleUserInput.bind(this)} />
          Upload image:
          {this.renderDropdown()}
          <br />
          <input type="submit" className="btn btn-primary" value="Create collection" disabled={!this.state.formValid}/>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div> 
          {error && resultBlock(error, "danger")}
        </div>
      </form>
    );
  }
}

export default CollectionAddPage;