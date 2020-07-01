import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = counters[index].value + 1;
    this.setState({ counters });
  };
  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value = counters[index].value - 1;
    this.setState({ counters });
  };
  handleDelete = (counterId) => {
    // console.log("Event Handeler Called", counterId);
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      // console.log(c);
      return c;
    });
    this.setState({ counters });
  };
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <NavBar
            totalCounters={
              this.state.counters.filter((c) => c.value > 0).length
            }
          />

          <main style={{ textAlign: "left" }} className="container">
            <Counters
              counters={this.state.counters}
              onDelete={this.handleReset}
              onIncrement={this.handleIncrement}
              onReset={this.handleReset}
              onDecrement={this.handleDecrement}
            />
          </main>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
