import React, { Component } from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { deleteStream, fetchStreams } from "../../actions";
import { Redirect } from "react-router-dom";
export class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  deleteStreamClick = () => {
    this.props.deleteStream(this.props.match.params.id);
  };
  showContent = () => {
    if (this.props.stream) {
      if (!this.props.isSignedIn) {
        return <Redirect to="/" />;
      } else {
        return (
          <div>
            Are you sure you want to delete stream with title:{" "}
            <h4>{this.props.stream.title}</h4>
          </div>
        );
      }
    } else {
      return null;
    }
  };
  render() {
    return (
      <div>
        <Modal
          onButtonClick={this.deleteStreamClick}
          delete="Delete"
          cancel="Cancel"
          content={this.showContent()}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps, { deleteStream, fetchStreams })(
  StreamDelete
);
