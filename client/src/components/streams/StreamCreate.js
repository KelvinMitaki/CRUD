import React, { Component } from "react";
import { connect } from "react-redux";
import { postStream } from "../../actions";
import StreamForm from "./StreamForm";
export class StreamCreate extends Component {
  onSubmit = (formValues) => {
    this.props.postStream(formValues, this.props.currentUser.userId);
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
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { postStream })(StreamCreate);
