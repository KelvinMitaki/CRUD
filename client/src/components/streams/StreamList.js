import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link, Redirect } from "react-router-dom";
import history from "../history";
export class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderStreams = () => {
    if (this.props.streams && this.props.currentUser) {
      return this.props.streams.map((stream) => {
        return (
          <div key={stream.id} className="item">
            {this.props.currentUser.userId === stream.userId ? (
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
    } else {
      return null;
    }
  };
  render() {
    return (
      <div>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.props.currentUser ? (
          <button
            onClick={() => history.push("/streams/new")}
            className="ui primary button"
          >
            Create New
          </button>
        ) : (
          <Redirect to="/streams/signin" />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
