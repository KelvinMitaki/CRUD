import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
export class Header extends Component {
  render() {
    return (
      <div>
        <div className="ui secondary pointing menu">
          <Link to="/" className="item">
            Streamy
          </Link>

          <div className="right menu">
            <Link to="/" className="ui item">
              All Streams
            </Link>
            <GoogleAuth />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
