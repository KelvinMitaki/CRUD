import React, { Component } from "react";
import { connect } from "react-redux";
import { postStream } from "../../actions";
import StreamForm from "./StreamForm";
import { Redirect } from "react-router-dom";
export class StreamCreate extends Component {
  onSubmit = formValues => {
    this.props.postStream(formValues, this.props.userId);
  };
  render() {
    if (!this.props.userId) {
      return <Redirect to="/" />;
    }
    return <StreamForm onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};
export default connect(mapStateToProps, { postStream })(StreamCreate);
