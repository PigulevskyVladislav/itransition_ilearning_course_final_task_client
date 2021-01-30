import React from "react";
import FormErrors from "../FormErrors"
import { fetchData, fetchPostData, fetchPostImage, getAddress, errorPage, resultBlock, loading } from "../../utils";

class ItemAddPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      collectionId: null,
      name: '',
      numbers: [],
      strings: [],
      texts: [],
      dates: [],
      bools: [], 
      error: null,
      formErrors: {name: '', description: '', newFieldName: ''},
      nameValid: false,
      formValid: false,
      isCreated: false,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.collection_id;
    this.setState({ collectionId: id });
    fetchData(getAddress().concat("/collections/extrafieldname/".concat(id)), this.getTypes);
  }

  handleSubmit = (event) => {
       
    event.preventDefault();
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

  render() {
    const { numbers, strings, texts, dates, bools, error, isCreated} = this.state;
    if (error) {
      return errorPage(error); 
    } else 
    return(
      <form className="container page-begin" onSubmit={this.handleSubmit.bind(this)}>
        <div className={"form-group col-lg-5 col-centered col-to-center ".concat(this.errorClass(!this.state.formValid))}> 
          
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} className="form-control" onChange={this.handleUserInput.bind(this)} />
          
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