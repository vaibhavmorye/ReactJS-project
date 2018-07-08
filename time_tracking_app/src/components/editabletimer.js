import React, { Component } from "react";
import TimerForm from "./timerform";
import Timer from "./timer";

export default class EditableTimer extends Component {
  state = {
    editFormOpen: false
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleFormSumbit = timer => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };
  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleFormSumbit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onFormClose={this.handleEditClick}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
          onStopClick={this.props.onStopClick}
          onStartClick={this.props.onStartClick}
        />
      );
    }
  }
}
