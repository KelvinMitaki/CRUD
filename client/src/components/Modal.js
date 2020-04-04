import ReactDOM from "react-dom";
import React, { Component } from "react";
import history from "./history";

export class Modal extends Component {
  renderPortal = () => {
    return ReactDOM.createPortal(
      <div>
        <div
          onClick={() => history.push("/")}
          className="ui dimmer modals visible active"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="ui standard modal visible active"
          >
            <div className="header">{this.props.header}</div>
            <div className="content">{this.props.title}</div>
            <div className="actions">{this.props.renderActions}</div>
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  };
  render() {
    return <div>{this.renderPortal()}</div>;
  }
}

export default Modal;
