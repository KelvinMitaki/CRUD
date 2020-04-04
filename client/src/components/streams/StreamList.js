import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import history from "../history";
export class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderStreams = () => {
    if (this.props.streams) {
      return this.props.streams.map((stream) => {
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
    } else {
      return null;
    }
  };
  render() {
    return (
      <div>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.props.userId ? (
          <button
            onClick={() => history.push("/streams/new")}
            className="ui primary button"
          >
            Create New
          </button>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
