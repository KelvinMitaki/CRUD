import React, { Component } from "react";
import GoogleAuth from "./GoogleAuth";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <div>
        <div className="ui secondary pointing menu">
          <Link to="/" className="item">
            Streamy
          </Link>
          <div className="right menu">
            <div className="item">
              <Link to="/">All Streams</Link>
            </div>
          </div>
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

export default Header;
