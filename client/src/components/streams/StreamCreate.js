import React, { Component } from "react";
import { postStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";
export class StreamCreate extends Component {
  onFormSubmit = formValues => {
    this.props.postStream(formValues, this.props.userId);
  };
  render() {
    return (
      <div>
        <StreamForm onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, { postStream })(StreamCreate);
