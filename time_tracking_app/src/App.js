import React, { Component } from 'react';
import TimersDashboard from './components/timersdashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimersDashboard/>
      </div>
    );
  }
}

export default App;
