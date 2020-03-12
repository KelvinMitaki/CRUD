import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui negative button"
        >
          Delete
        </button>
        <button onClick={() => history.push("/")} className="ui button">
          Cancel
        </button>
      </React.Fragment>
    );
  }
  renderContent() {
    const { title } = this.props.stream;
    if (this.props.stream) {
      return `Are you sure you want to delete stream with title: ${title}`;
    } else {
      return "Are you sure you want to delete this stream?";
    }
  }
  render() {
    return (
      <div>
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
