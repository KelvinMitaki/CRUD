import React, { Component } from "react";
import Header from "./Header";
import { Router, Route, Switch } from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import history from "./history";
class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/streams/new" component={StreamCreate} />
            <Route path="/streams/edit/:id" component={StreamEdit} />
            <Route path="/streams/show/:id" component={StreamShow} />
            <Route path="/streams/delete/:id" component={StreamDelete} />
            <Route path="/" exact component={StreamList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
