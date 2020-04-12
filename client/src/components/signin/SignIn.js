import React, { Component } from "react";
import "./SignIn.css";
import { Link, Redirect } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase/Firebase";
import history from "../history";
import { connect } from "react-redux";
export class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
      return setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
  };
  render() {
    if (!this.props.currentUser) {
      return (
        <div>
          <div className="login-page">
            <div className="form">
              <form className="login-form" onSubmit={this.handleSubmit}>
                <h2 style={{ color: "red" }}> {this.state.error}</h2>
                <label htmlFor="email" style={{ fontWeight: "bolder" }}>
                  EMAIL
                </label>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  style={{ color: "black" }}
                  name="email"
                />
                <label htmlFor="password" style={{ fontWeight: "bolder" }}>
                  PASSWORD
                </label>
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  style={{ color: "black" }}
                />
                <button>login</button>
                <br />
                <br />
              </form>
              <button
                onClick={() => signInWithGoogle()}
                className="ui button google plus"
              >
                Login With Google
              </button>
              <p className="message">
                Not registered?{" "}
                <Link to="/streams/signup">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};
export default connect(mapStateToProps)(SignIn);
