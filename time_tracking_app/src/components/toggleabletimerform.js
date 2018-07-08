import React, { Component } from "react";
import TimerForm from "./timerform";

export default class ToggleableTimerForm extends Component {
  state = {
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState(() => {
      return { isOpen: true };
    });
  };

  handleFormClose = () => {
    this.setState(() => {
      return { isOpen: false };
    });
  };

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button
            className="ui basic button icon"
            onClick={this.handleFormOpen}
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}
