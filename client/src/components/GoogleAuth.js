import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut, signIn } from "../actions";
export class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1090919437090-b6jmmf7sfc0f31dd47qn225atbbr57du.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      return this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      return this.props.signOut();
    }
  };
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };
  renderButton = () => {
    if (this.props.auth.isSignedIn === null) {
      return null;
    } else if (this.props.auth.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui google plus button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui google plus button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };
  render() {
    return <div>{this.renderButton()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
