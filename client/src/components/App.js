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

export class App extends Component {
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
        </Router>
      </div>
    );
  }
}

export default App;
