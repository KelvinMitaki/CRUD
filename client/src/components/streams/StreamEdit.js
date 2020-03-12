import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    if (this.props.stream) {
      const { title, description } = this.props.stream;
      return (
        <div>
          <h3>Edit a Stream</h3>
          <h3>{this.props.stream.title}</h3>

          <p>{this.props.stream.description}</p>
          <StreamForm
            initialValues={{ title, description }}
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
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
