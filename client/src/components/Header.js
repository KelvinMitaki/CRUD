import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";

export class Header extends Component {
  render() {
    return (
      <div>
        <div className="ui pointing menu">
          <Link to="/" className="item">
            Streamy
          </Link>

          <div className="right menu">
            {this.props.userId ? (
              <Link to={`/streams/user/${this.props.userId}`} className="item">
                My Streams
              </Link>
            ) : null}
          </div>
          <GoogleAuth />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps)(Header);
