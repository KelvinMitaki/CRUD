import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
export class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  showButtons = stream => {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div>
          <div className="right floated content">
            <Link
              to={`/streams/edit/${stream.id}`}
              className="ui primary button"
            >
              Edit
            </Link>
            <Link
              to={`/streams/delete/${stream.id}`}
              className="ui negative button"
            >
              Delete
            </Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  renderStreams = () => {
    if (this.props.streams) {
      return this.props.streams.map(stream => {
        return (
          <div className="item" key={stream.id}>
            {this.showButtons(stream)}
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
    } else {
      return null;
    }
  };
  renderCreateStream = () => {
    if (this.props.isSignedIn) {
      return (
        <Link to="/streams/new" className="ui primary button">
          Create Stream
        </Link>
      );
    }
  };
  render() {
    return (
      <div>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreateStream()}
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
