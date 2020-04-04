import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
export class StreamShow extends Component {
  renderStream = () => {
    this.props.fetchStream(this.props.match.params.id);
    if (this.props.stream) {
      const { title, description } = this.props.stream;
      return (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      );
    } else {
      return null;
    }
  };
  render() {
    return <div>{this.renderStream()}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
