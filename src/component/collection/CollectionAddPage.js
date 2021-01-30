import React from "react";
import FormErrors from "../FormErrors"
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { fetchData, fetchPostData, fetchPostImage, getAddress, errorPage, resultBlock, loading } from "../../utils";
import "../../css/image_overlay.css"

class CollectionAddPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      typeId: '-1',
      description: '',
      image: null,
      localImageURL: null,
      imageURL: null,
      imageName: '',
      types: [],
      numbers: [],
      strings: [],
      texts: [],
      dates: [],
      bools: [], 
      newFieldType: 'numbers',
      newFieldName: '',
      error: null,
      formErrors: {name: '', description: '', newFieldName: ''},
      nameValid: false,
      typeIdValid: false,
      descriptionValid: true,
      formValid: false,
      isLoaded: false,
      isCreated: false,
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
      image: file,
      localImageURL: URL.createObjectURL(file),
      imageName: file.name,
    });
  }

  removeImage = () => {
    this.setState({
      image: null,
      localImageURL: null,
      imageURL: null,
      imageName: '',
    });
  }

  handleAddExtraField = () => {
    let fieldArrayName = this.state.newFieldType;
    let fieldArray = this.state[fieldArrayName];
    let newFieldName = this.state.newFieldName;
    let error = newFieldName.length >= 3 
                && newFieldName.length <= 25 ?
                '' : 'an extra field must have 3-25 chars';
    if (fieldArray.indexOf(newFieldName) > -1) {
      error = 'an extra field with the same name already exists' 
    }
    if (fieldArray.length === 3) {
      error = 'you can only have 3 extra fields of the same type' 
    }
    if (!error) {
      fieldArray.push(newFieldName);
      this.setState({ [fieldArrayName]: fieldArray });
    } else {
      let formErrors = this.state.formErrors;
      formErrors.newFieldName = error;
      this.setState({ formErrors });
    }
  }

  handleTypeChange = (event) => {
    this.setState({ typeId: event.target.value });
  }

  handleExtraNameChange = (event) => {
    this.setState({ newFieldName: event.target.value });
  }

  handleExtraTypeChange = (event) => {
    this.setState({ newFieldType: event.target.value });
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  handleSubmit = (event) => {
    try {
      this.sendData();
    } catch (error) {
      this.setState({ error });
    }
    
    event.preventDefault();
  }

  uploadImageCallback = (response) => {
    let result = response.result;
    if (result) {
      this.setState({ imageURL: result.url }) 
    } else {
      this.setState({ error: { message: "Image loading error" } });
    }
  }

  sendData = () => {
    const { name, description, typeId, image } = this.state;
    let newCollection = {};
    newCollection.name = name;
    newCollection.description = description;
    newCollection.picture = null;
    this.addExtraFields(newCollection);
    newCollection.type_id = typeId;
    newCollection.user_id = this.props.cookies.get('token');
    if (image) {
      this.uploadImage(image, newCollection);
    } else {    
      fetchPostData(getAddress().concat("/collections/add"), newCollection, this.checkResult);
    }
  }

  checkResult = (response) => {
    if (response.result) {
      this.setState({ 
        isCreated: true,
        error: null
      });
    } else {
      this.setState({ error: response.error });
    }
  }

  addExtraFields = (collection) => {
    const { numbers, strings, texts, 
            dates, bools } = this.state;
    if (!(numbers.length === 0 && strings.length === 0 && texts.length === 0 
       && dates.length === 0 && bools.length === 0)) {
      collection.extra_field_name = {};
      this.addExtraFieldsOfType(collection, numbers, 'numbers');
      this.addExtraFieldsOfType(collection, strings, 'strings');
      this.addExtraFieldsOfType(collection, texts, 'texts');
      this.addExtraFieldsOfType(collection, dates, 'dates');
      this.addExtraFieldsOfType(collection, bools, 'bools');
      collection.extra_field_name = JSON.stringify(collection.extra_field_name);
    }
    return collection;
  }

  addExtraFieldsOfType = (collection, fields, type) => {
    if (fields.length !== 0) {
      collection.extra_field_name[type] = fields;
    }
  }

  uploadImage = (image, newCollection) => {
    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "finaltaskimages");
    fetchPostImage(data, newCollection, fetchPostData, this.checkResult);
  } 

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let nameValid = this.state.nameValid;
      let typeIdValid = this.state.typeIdValid;
      let descriptionValid = this.state.descriptionValid;
    switch(fieldName) {
        case 'name':
          nameValid = value.length >= 3 && value.length <= 25;
          fieldValidationErrors.name = nameValid ? '' : 'name must have 3-25 chars';
          break;
        case 'typeId':
          typeIdValid = value !== '-1';
          fieldValidationErrors.typeId = typeIdValid ? '': 'choose collection type';
          break;
        case 'description':
          descriptionValid = value.length <= 100;
          fieldValidationErrors.description = descriptionValid ? '': 'description must have 0-100 chars';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      nameValid: nameValid,
                      typeIdValid: typeIdValid,
                      descriptionValid: descriptionValid
                    }, this.validateForm);
    }
    validateForm() {
      this.setState({formValid: this.state.nameValid &&
                                this.state.typeIdValid &&
                                this.state.descriptionValid});
  }

  renderDropdown() {
    let localImageURL = this.state.localImageURL;
    if (localImageURL) {
      return(
        <div className="img-wrapper collection-image">
          <div className="img-overlay">
            <button type="button" 
                    className="close p-2 position-absolute " 
                    aria-label="Close"
                    onClick={this.removeImage} >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <img src={localImageURL} alt={this.state.imageName} className="img-fluid img-responsive collection-image" />
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
  
  renderArray(items, color) {
    let result = items.map((item, index) => 
      <label className={"badge rounded-pill bg-".concat(color)} 
             onClick={() => {
               let index = items.indexOf(item);
               this.setState({ 
                 [items]: items.splice(index, 1)
                 });}}
             key={index}>{item}</label>);
    return result;
  }

  render() {
    const { numbers, strings, texts, dates, bools, error, isLoaded, isCreated} = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!isLoaded) {
      return loading();
    } else 
    return(
      <form className="container page-begin" onSubmit={this.handleSubmit.bind(this)}>
        <div className={"form-group col-lg-5 col-centered col-to-center ".concat(this.errorClass(!this.state.formValid))}> 
          
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleUserInput.bind(this)} />
          <label>Type:</label>
          <select name="typeId" className="custom-select" id="inputGroupSelect" defaultValue={-1} onChange={this.handleUserInput.bind(this)}>
            <option value={-1}>Choose a salutation ...</option>
            {this.renderOptions()}
          </select>
          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} className="form-control" onChange={this.handleUserInput.bind(this)} />
          <label>Upload image:</label>
          {this.renderDropdown()}
          <label>Add extra field:</label>
          <div className="form-group">
            <label>Type:</label>
            <select className="custom-select w-50 mr-2 ml-2" onChange={this.handleExtraTypeChange.bind(this)} defaultValue="1">
              <option value="numbers" className="bg-primary text-white">number</option>
              <option value="strings" className="bg-warning text-white">string</option>
              <option value="texts" className="bg-danger text-white">text</option>
              <option value="dates" className="bg-info text-white">date</option>
              <option value="bools" className="bg-success text-white">bool</option>
            </select>
            <input type="button" className="btn btn-primary" value="Add" onClick={this.handleAddExtraField} />
          </div>
          <div className="form-group">
            <label>Field name:</label>
            <input type="text" value={this.state.newFieldName} className="form-control" onChange={this.handleExtraNameChange.bind(this)} />
            <div className="form-group d-flex container-fluid">
              <div className="row">
                {numbers.length > 0 && this.renderArray(numbers, 'primary')}
                {strings.length > 0 && this.renderArray(strings, 'warning')}
                {texts.length > 0 && this.renderArray(texts, 'danger')}
                {dates.length > 0 && this.renderArray(dates, 'info')}
                {bools.length > 0 && this.renderArray(bools, 'success')}
              </div>
            </div>
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Create collection" disabled={!this.state.formValid}/>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div> 
          {error && resultBlock(error.message, "danger")}
          {isCreated && resultBlock('collection was created', "success")}
        </div>
      </form>
    );
  }
}

export default withCookies(CollectionAddPage);