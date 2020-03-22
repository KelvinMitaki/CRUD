import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
export class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onFormSubmit = formValues => {
    this.props.editStream(
      formValues,
      this.props.match.params.id,
      this.props.userId
    );
  };
  render() {
    if (this.props.stream) {
      const { title, description } = this.props.stream;
      return (
        <div>
          <StreamForm
            initialValues={{ title: title, description: description }}
            onSubmit={this.onFormSubmit}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    userId: state.auth.userId
  };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
