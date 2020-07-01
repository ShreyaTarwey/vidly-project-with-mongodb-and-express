import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <React.Fragment>
        <p
          style={{ zoom: 1.25, margin: 15 }}
          className={this.handleClassName()}
        >
          {this.props.counter.value <= 0 ? "Zero" : this.props.counter.value}
        </p>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary "
        >
          +
        </button>
        {this.handleDecrementButton()}
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-secondary btn-danger m-2"
        >
          X
        </button>
        <br />
      </React.Fragment>
    );
  }

  handleClassName = () => {
    if (this.props.counter.value <= 0) return "badge badge-warning col-lg-1";
    return "badge badge-primary col-lg-1";
  };
  handleDecrementButton = () => {
    if (this.props.counter.value > 0)
      return (
        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary m-2"
        >
          -
        </button>
      );
    return (
      <button className="btn btn-secondary m-2" disabled>
        -
      </button>
    );
  };
}

export default Counter;
