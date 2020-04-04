import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import history from "../history";
export class StreamsUser extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderUserStreams = () => {
    const results = this.props.streams.filter((stream) => {
      return stream.userId === this.props.userId;
    });
    return results.map((stream) => {
      return (
        <div key={stream.id} className="item">
          {this.props.userId === stream.userId ? (
            <div>
              <div className="right floated content">
                <Link
                  to={`/streams/edit/${stream.id}`}
                  className="ui button primary"
                >
                  EDIT
                </Link>
              </div>
              <div className="right floated content">
                <Link
                  to={`/streams/delete/${stream.id}`}
                  className="ui button negative"
                >
                  DELETE
                </Link>
              </div>
            </div>
          ) : null}

          <i className="ui camera big icon" />
          <div className="content">
            <Link to={`/streams/show/${stream.id}`} className="header">
              {stream.title}
            </Link>
            {stream.description}
          </div>
        </div>
      );
    });
  };
  render() {
    if (this.props.streams && this.props.userId) {
      return (
        <div>
          <div className="ui celled list">{this.renderUserStreams()}</div>;
          <button
            onClick={() => history.push("/streams/new")}
            className="ui primary button"
          >
            Add Stream
          </button>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.userId ? (
            <div>
              <h2>No Streams Available, Please start adding streams</h2>
              <button
                onClick={() => history.push("/streams/new")}
                className="ui button primary"
              >
                Create New Stream
              </button>
            </div>
          ) : (
            <h2>Sign In to add a Stream</h2>
          )}
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamsUser);
