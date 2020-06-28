import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
  };
  render() {
    return (
      <React.Fragment>
        <p
          style={{ zoom: 1.25, margin: 15 }}
          className={this.handleClassName()}
        >
          {this.state.count === 0 ? "Zero" : this.state.count}
        </p>
        <button onClick={this.handleIncrement} className="btn btn-secondary">
          Increment
        </button>
      </React.Fragment>
    );
  }
  handleIncrement = (count) => {
    count = this.state.count;
    count = count + 1;
    this.setState({
      count,
    });
    console.log(count);
  };
  handleClassName = () => {
    if (this.state.count === 0) return "badge badge-warning";
    return "badge badge-primary";
  };
}

export default Counter;
