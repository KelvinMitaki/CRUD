import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";
import { auth } from "./firebase/Firebase";
import history from "./history";

export class Header extends Component {
  render() {
    return (
      <div>
        <div className="ui pointing menu">
          <Link to="/" className="item">
            Streamy
          </Link>

          <div className="right menu">
            {this.props.currentUser ? (
              <React.Fragment>
                <Link
                  to={`/streams/user/${this.props.currentUser.userId}`}
                  className="item"
                >
                  My Streams
                </Link>
                <button
                  onClick={() => {
                    history.replace("/streams/signin");

                    return auth.signOut();
                  }}
                  className="ui google plus button"
                >
                  Log Out
                </button>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(Header);
