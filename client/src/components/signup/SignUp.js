import React, { Component } from "react";
import "./SignUp.css";
import { Link, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "../firebase/Firebase";
import { connect } from "react-redux";
export class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match" });
      return setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
    if (!username) {
      this.setState({ error: "Please enter a username" });
      return setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName: username });
      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
          <div className="main-w3layouts wrapper">
            <h1>Creative SignUp Form</h1>
            <div className="main-agileinfo">
              <div className="agileits-top">
                <form onSubmit={this.handleSubmit}>
                  <h3 style={{ color: "red" }}>{this.state.error}</h3>
                  <input
                    onChange={this.handleChange}
                    value={this.state.username}
                    className="text"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                  />
                  <input
                    onChange={this.handleChange}
                    value={this.state.email}
                    className="text email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    onChange={this.handleChange}
                    value={this.state.password}
                    className="text"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <input
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
                    className="text w3lpass"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                  />

                  <input type="submit" value="SIGNUP" />
                </form>
                <p>
                  Have an Account? <Link to="/streams/signin"> Login Now!</Link>
                </p>
              </div>
            </div>

            <ul className="colorlib-bubbles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
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
export default connect(mapStateToProps)(SignUp);
