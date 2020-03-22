import ReactDOM from "react-dom";

import React, { Component } from "react";

export class Modal extends Component {
  renderModal = () => {
    return ReactDOM.createPortal(
      <div
        onClick={this.props.onDismiss}
        className="ui dimmer modals visible active"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="ui standard modal visible active"
        >
          <div className="header">{this.props.header}</div>
          <div className="content">{this.props.content}</div>
          <div className="actions">{this.props.actions}</div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  };
  render() {
    return <div>{this.renderModal()}</div>;
  }
}

export default Modal;
