import React from "react";

class FormErrors extends React.Component {
  render() {
    let formErrors = this.props.formErrors;

    return(
      <div className='mt-5'>
        {Object.keys(formErrors).map((fieldName, i) => {
          if(formErrors[fieldName].length > 0){
            return (
              <p className='alert alert-danger' key={i}>{formErrors[fieldName]}</p>
            )        
          } else {
            return '';
          }
        })}
      </div>
    );
  }
}

export default FormErrors;