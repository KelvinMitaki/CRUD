import React from "react";
import ReactDOM from "react-dom";
import history from "./history";
class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div
        onClick={() => history.push("/")}
        className="ui dimmer modals visible active"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="ui standard modal visible active"
        >
          <div className="header">Delete Stream</div>
          <div className="content">{this.props.content}</div>
          <div className="actions">
            <div
              onClick={this.props.onButtonClick}
              className="ui primary button"
            >
              {this.props.delete}
            </div>
            <div
              onClick={() => history.push("/")}
              className="ui negative button"
            >
              {this.props.cancel}
            </div>
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

export default Modal;
