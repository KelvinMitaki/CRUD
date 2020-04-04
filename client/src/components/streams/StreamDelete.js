import React, { Component } from "react";
import Modal from "../Modal";
import { deleteStream, fetchStreams } from "../../actions";
import { connect } from "react-redux";
import history from "../history";
export class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderActions = () => {
    return (
      <div>
        <div className="actions">
          <div
            onClick={() => this.props.deleteStream(this.props.match.params.id)}
            className="ui negative button"
          >
            DELETE
          </div>
          <div onClick={() => history.push("/")} className="ui primary button">
            CANCEL
          </div>
        </div>
      </div>
    );
  };
  render() {
    if (this.props.stream) {
      const { title } = this.props.stream;
      return (
        <div>
          <Modal
            title={`Are you sure you want to delete stream with title: ${title}`}
            header="Delete Stream"
            renderActions={this.renderActions()}
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
export default connect(mapStateToProps, { deleteStream, fetchStreams })(
  StreamDelete
);
