import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import StreamsUser from "./streams/StreamsUser";
import Header from "./Header";
import history from "./history";
import SignUp from "./signup/SignUp";
import SignIn from "./signin/SignIn";
import { auth, createUserProfileDocument } from "./firebase/Firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "../actions";

export class App extends Component {
  constructor(props) {
    super(props);

    this.unsubscribeFromOauth = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.props.setCurrentUser({
            ...snapshot.data(),
            userId: snapshot.id,
          });
        });
      } else {
        this.props.setCurrentUser(userAuth);
      }
    });
  }
  unsubscribeFromOauth = null;

  componentWillUnmount() {
    this.unsubscribeFromOauth();
  }
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new/" component={StreamCreate} />
          <Route path="/streams/edit/:id" component={StreamEdit} />
          <Route path="/streams/user/:id" component={StreamsUser} />
          <Route path="/streams/show/:id" component={StreamShow} />
          <Route path="/streams/delete/:id" component={StreamDelete} />
          <Route path="/streams/signup" component={SignUp} />
          <Route path="/streams/signin" component={SignIn} />
        </Router>
      </div>
    );
  }
}

export default connect(null, { setCurrentUser })(App);
