import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
export class StreamForm extends Component {
  renderErrors = ({ error, touched }) => {
    if (error && touched) {
      return <div className="ui error message">{error}</div>;
    } else {
      return null;
    }
  };
  renderInput = props => {
    const className = `field ${
      props.meta.error && props.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{props.label}</label>
        <input type="text" {...props.input} />
        {this.renderErrors(props.meta)}
      </div>
    );
  };
  onFormSubmit = formValues => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <div className="ui form error">
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Field name="title" component={this.renderInput} label="Title" />
          <Field
            name="description"
            component={this.renderInput}
            label="Description"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}
const validate = formValues => {
  let errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
export default reduxForm({
  form: "StreamForm",
  validate
})(StreamForm);
