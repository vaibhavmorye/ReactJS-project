import React, { Component } from "react";
import EditableTimerList from "./editabletimerlist";
import ToggleableTimerForm from "./toggleabletimerform";
import { newTimer } from "../helpers";
import {getTimers} from "../client";

export default class TimerDashboard extends Component {
  state = {
    timers: []
  };

  componentDidMount(){
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  }

  loadTimersFromServer = () =>{
   getTimers((serverTimers)=>{
      console.log(serverTimers);
      this.setState({timers:serverTimers});
    });
  }
  handleCreateFormSubmit = timer => {
    this.createTimer(timer);
  };

  handleEditFormSubmit = newAttrs => {
    this.updateTimer(newAttrs);
  };

  createTimer = timer => {
    const t = newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    });
  };

  handleTrashClick = timerId => {
    this.deleteTimer(timerId);
  };

  handleStartClick = timerId => {
    this.startTimer(timerId);
  };

  handleStopClick = timerId => {
    this.stopTimer(timerId);
  };

  updateTimer = newAttrs => {
    this.setState({
      timer: this.state.timers.map(timer => {
        if (timer.id === newAttrs.id) {
          return Object.assign(timer, timer, {
            title: newAttrs.title,
            project: newAttrs.project
          });
        } else {
          return timer;
        }
      })
    });
  };

  deleteTimer = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    });
  };

  startTimer = timerId => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now
          });
        } else {
          return timer;
        }
      })
    });
  };

  stopTimer = timerId => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          });
        } else {
          return timer;
        }
      })
    });
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
}
