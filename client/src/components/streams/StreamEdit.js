import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import { Redirect } from "react-router-dom";
export class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onFormSubmit = formValues => {
    this.props.editStream(
      formValues,
      this.props.match.params.id,
      this.props.stream.userId
    );
  };
  render() {
    if (this.props.stream) {
      if (!this.props.stream.userId) {
        return <Redirect to="/" />;
      } else {
        return (
          <div>
            <StreamForm
              initialValues={{
                title: this.props.stream.title,
                description: this.props.stream.description
              }}
              onSubmit={this.onFormSubmit}
            />
          </div>
        );
      }
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
