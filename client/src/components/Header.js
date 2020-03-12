import React from "react";
import { Link } from "react-router-dom";
import GoogleOauth from "./GoogleOauth";

function Header() {
  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Streamy
        </Link>
        <div className="right menu">
          <Link to="/" className="item">
            All Streams
          </Link>
          <GoogleOauth />
        </div>
      </div>
    </div>
  );
}

export default Header;
