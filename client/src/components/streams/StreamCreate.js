import React, { Component } from "react";
import { connect } from "react-redux";
import { postStream } from "../../actions";
import StreamForm from "./StreamForm";
export class StreamCreate extends Component {
  onSubmit = (formValues) => {
    this.props.postStream(formValues, this.props.userId);
  };
  render() {
    return (
      <div>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { postStream })(StreamCreate);
