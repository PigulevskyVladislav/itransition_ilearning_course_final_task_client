import React from "react";
import Select from 'react-select';
import FormErrors from "../FormErrors"
import { fetchData, fetchPostData, getAddress, errorPage, resultBlock, loading } from "../../utils";

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
      options: [],
      selectedOptions: [],
      error: null,
      formErrors: {name: '', result: ''},
      nameValid: false,
      formValid: false,
      haveExtraField: true,
      isTagsLoaded: false,
      isExtraFieldsLoaded: false,
      isCreated: false,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.collection_id;
    this.setState({ collectionId: id });
    fetchData(getAddress().concat("/collections/extrafieldname/".concat(id)), this.getItem);
    fetchData(getAddress().concat("/tags"), this.getTags);
  }

  getItem = (response) => {
    let result = response.result;
    if (result === 'false') {
      this.setState({
        haveExraField: false,
      });
    } else
    if (result) {
      this.fillExtraFieldName(result.numbers, 'numbersName');
      this.fillExtraFieldName(result.strings, 'stringsName');
      this.fillExtraFieldName(result.texts, 'textsName');
      this.fillExtraFieldName(result.dates, 'datesName');
      this.fillExtraFieldName(result.bools, 'boolsName');
      this.setState({
        isExtraFieldsLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Extra field loading error" },
      });
    }
  }

  getTags = (response) => {
    let result = response.result;
    if (result) {
      let options = result.map(item => {
        let option = {};
        option.value = item.id;
        option.label = item.name;
        return option;
      });
      this.setState({
        options,
        isTagsLoaded: true,
      });
    } else {
      this.setState({
        error: { message: "Tags loading error" },
      });
    }
  }

  fillExtraFieldName = (fieldNames, name) => {
    if (fieldNames) {
      this.setState({ [name]: fieldNames });
    }
  }

  handleSubmit = (event) => {
    const { name, collectionId, 
            haveExtraField, selectedOptions,
            numbersName, numbersValue,
            stringsName, stringsValue,
            textsName, textsValue,
            datesName, datesValue,
            boolsName, boolsValue
    } = this.state;
    let result = {item:{},tagIds:null};
    let newItem = {};
    newItem.name = name;  
    newItem.extra_field = null;
    newItem.collection_id = collectionId;
    if (haveExtraField) {
      let extraField = [];
      extraField = extraField.concat(
        this.getExtaraFieldArray(numbersName, numbersValue, null));
      extraField = extraField.concat(
        this.getExtaraFieldArray(stringsName, stringsValue, null));
      extraField = extraField.concat(
        this.getExtaraFieldArray(textsName, textsValue, null));
      extraField = extraField.concat(
        this.getExtaraFieldArray(datesName, datesValue, null));
      extraField = extraField.concat(
        this.getExtaraFieldArray(boolsName, boolsValue, false));
      newItem.extra_field = JSON.stringify(extraField);
    }
    result.item = newItem;
    let tagIds = [];
    if (selectedOptions.length !== 0) {
      for (let i = 0; i < selectedOptions.length; i++) {
        tagIds.push(selectedOptions[i].value);
      }
    }
    result.tagIds = tagIds;
    result.item = newItem;
    fetchPostData(getAddress().concat("/items/add"), result, this.checkResult);
    event.preventDefault();
  }

  getExtaraFieldArray = (names, values, empty) => {
    let result = [];
    if (names.length !== 0) {
      for (let i = 0; i < names.length; i++) {
        let value = values[i] || empty;
        result.push({name:names[i],value:value})
      }
    }
    return result;
  }

  checkResult = (response) => {
    const { formErrors } = this.state;
    if (response.result) {
      formErrors.result = ''
      this.setState({ 
        isCreated: true,
      });
    } else {
      formErrors.result = 'item adding error';
    }
    this.setState({ formErrors });
  }

  handleExtraFieldChange = (event) => {
    let inputData = event.target.getAttribute('input-data');
    let fields = this.state[inputData];
    let isCheckbox = event.target.type === 'checkbox';
    let value = isCheckbox ? event.target.checked : event.target.value;
    let index = event.target.id;
    fields[index] = value;
    this.setState({ [inputData]: fields });
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;    
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  handleChangeTag = selectedOptions => {
    this.setState({ 
      selectedOptions 
    });
  };

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
      return itemFields;
    }
    return null;
  }

  render() {
    const {options, selectedOptions, error, isExtraFieldsLoaded, isTagsLoaded, isCreated, haveExtraField} = this.state;
    if (error) {
      return errorPage(error); 
    } else if (!((isExtraFieldsLoaded || !haveExtraField) && isTagsLoaded)) {
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
          <label>Tags:</label>
          <Select
            value={selectedOptions}
            onChange={this.handleChangeTag}
            options={options}
            isMulti={true}
          />
          <br />
          <input type="submit" className="btn btn-primary" value="Create item" disabled={!this.state.formValid}/>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div> 
          {isCreated && resultBlock('item was created', "success")}
        </div>
      </form>
    );
  }
}

export default ItemAddPage;