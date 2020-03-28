import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
export class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAuthButtons = (userId, id) => {
    if (this.props.currentUserId === userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/delete/${id}`} className="ui button negative">
            Delete
          </Link>
          <Link to={`/streams/edit/${id}`} className="ui button primary">
            Edit
          </Link>
        </div>
      );
    }
  };
  renderCreateStreamButton = () => {
    if (this.props.isSignedIn) {
      return (
        <Link to="/streams/new" className="ui primary button">
          Create Stream
        </Link>
      );
    }
  };
  renderStreams = () => {
    return this.props.streams.map(stream => {
      return (
        <div key={stream.id} className="item">
          {this.renderAuthButtons(stream.userId, stream.id)}
          <i className="large camera middle aligned icon" />
          <div className="content">
            <Link to={`/streams/show/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreateStreamButton()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
