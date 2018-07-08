import React, { Component } from "react";
import { renderElapsedString } from "../helpers";
import TimerActionButton from './timeractionbutton';

export default class Timer extends Component {
  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  render() {
    const elapsedString = renderElapsedString(this.props.elapsed);
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">{this.props.project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span
              className="right floated edit icon"
              onClick={this.props.onEditClick}
            >
              <i className="edit icon" />
            </span>
            <span
              className="right floated trash icon"
              onClick={this.handleTrashClick}
            >
              <i className="trash icon" />
            </span>
          </div>
        </div>
        <div>
          <TimerActionButton
            timerIsRunning={!!this.props.runningSince}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
        </div>
      </div>
    );
  }
}
