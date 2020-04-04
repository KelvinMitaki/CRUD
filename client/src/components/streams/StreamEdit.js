import React, { Component } from "react";
import { connect } from "react-redux";
import { editStream, fetchStreams } from "../../actions";
import StreamForm from "./StreamForm";
export class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  onSubmit = (formValues) => {
    this.props.editStream(formValues, this.props.match.params.id);
  };
  render() {
    if (this.props.stream) {
      const { title, description } = this.props.stream;
      return (
        <div>
          <StreamForm
            initialValues={{ title: title, description: description }}
            onSubmit={this.onSubmit}
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
  };
};
export default connect(mapStateToProps, { editStream, fetchStreams })(
  StreamEdit
);
