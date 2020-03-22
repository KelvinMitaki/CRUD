import React, { Component } from "react";
import Modal from "../Modal";
import history from "../history";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";
export class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui negative button"
        >
          Delete
        </button>
        <button onClick={() => history.push("/")} className="ui button">
          Cancel
        </button>
      </React.Fragment>
    );
  };
  render() {
    if (this.props.stream) {
      return (
        <div>
          <Modal
            header="Delete Stream"
            content={`
              Are you sure you want to delete the stream: ${this.props.stream.title}`}
            actions={this.renderActions()}
            onDismiss={() => history.push("/")}
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
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
