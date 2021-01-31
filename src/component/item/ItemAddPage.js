import React from "react";
import FormErrors from "../FormErrors"
import { fetchData, fetchPostData, fetchPostImage, getAddress, errorPage, resultBlock, loading } from "../../utils";

class ItemAddPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      collectionId: null,
      name: '',
      numbersName: [],
      numbersValue: [],
      stringsName: [],
      stringsValue: [],
      textsName: [],
      textsValue: [],
      datesName: [],
      datesValue: [],
      boolsValue: [], 
      boolsName: [], 
      error: null,
      formErrors: {name: ''},
      nameValid: false,
      formValid: false,
      isLoaded: false,
      isCreated: false,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.collection_id;
    this.setState({ collectionId: id });
    fetchData(getAddress().concat("/collections/extrafieldname/".concat(id)), this.getItem);
  }

  getItem = (response) => {
    let result = response.result;
    if (result) {
      this.fillExtraFieldName(result.numbers, 'numbersName');
      this.fillExtraFieldName(result.strings, 'stringsName');
      this.fillExtraFieldName(result.texts, 'textsName');
      this.fillExtraFieldName(result.dates, 'datesName');
      this.fillExtraFieldName(result.bools, 'boolsName');
      this.setState({
        isLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Collection loading error" },
      });
    }
  }

  fillExtraFieldName = (fieldNames, name) => {
    if (fieldNames) {
      this.setState({ [name]: fieldNames });
    }
  }

  handleSubmit = (event) => {

    event.preventDefault();
  }

  handleExtraFieldChange = (event) => {
    let inputData = event.target.getAttribute('input-data');
    let fields = this.state[inputData];
    let isCheckbox = event.target.type === 'checkbox';
    let value = isCheckbox ? event.target.checked : event.target.value;
    let index = event.target.id;
    fields[index] = value;
    this.setState({ [inputData]: fields });
    console.log(this.state[inputData]);
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;    
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let nameValid = this.state.nameValid;
    switch(fieldName) {
        case 'name':
          nameValid = value.length >= 3 && value.length <= 25;
          fieldValidationErrors.name = nameValid ? '' : 'name must have 3-25 chars';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      nameValid: nameValid,
                    }, this.validateForm);
    }
    validateForm() {
      this.setState({formValid: this.state.nameValid});
  }

  renderFields = (fields, type) => {
    let fieldsName = this.state[fields.concat('Name')];
    if (fieldsName) {
      let itemFields = fieldsName.map((field, index) => 
        <div key={"key_div_"+fields+"_"+index} className="form-group">
          <label name={"label_"+fields+"_"+index} >{field}:</label>
          <input name={"input_"+fields+"_"+index} input-data={fields+"Value"} id={index} type={type} className="form-control" onChange={this.handleExtraFieldChange.bind(this)}/>
        </div>
      );
      return itemFields;
    }
    return null;
  }

  renderBools = () => {
    let bools = this.state.boolsName;
    if (bools) {
      let itemFields = bools.map((field, index) => 
        <div key={"key_div_bools_"+index} className="form-group">
          <input name={"input_bools_"+index} input-data="boolsValue" id={index} type="checkbox" onChange={this.handleExtraFieldChange.bind(this)} />
          <label name={"label_bools_"+index} className="form-check-label ml-2">{field}</label>
        </div>
      );
      console.log(itemFields);
      return itemFields;
    }
    return null;
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
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleUserInput.bind(this)} />
          </div>
          {this.renderFields('numbers', 'number')}
          {this.renderFields('strings', 'text')}
          {this.renderFields('texts', 'text')}
          {this.renderFields('dates', 'date')}
          {this.renderBools()}
          <br />
          <input type="submit" className="btn btn-primary" value="Create collection" disabled={!this.state.formValid}/>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div> 
          {error && resultBlock(error.message, "danger")}
          {isCreated && resultBlock('item was created', "success")}
        </div>
      </form>
    );
  }
}

export default ItemAddPage;