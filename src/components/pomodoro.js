import React, { Component } from 'react';

export default class Pomodoro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      isActive: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { isActive, seconds, minutes, hours } = this.state;
      if (isActive) {
        let updatedSeconds = parseInt(seconds, 10);
        let updatedMinutes = parseInt(minutes, 10);
        let updatedHours = parseInt(hours, 10);

        if (updatedSeconds > 0) {
          updatedSeconds--;
        } else {
          if (updatedMinutes > 0) {
            updatedMinutes--;
            updatedSeconds = 59;
          } else {
            if (updatedHours > 0) {
              updatedHours--;
              updatedMinutes = 59;
              updatedSeconds = 59;
            } else {
              clearInterval(this.interval);
              return;
            }
          }
        }

        this.setState({
          hours: updatedHours.toString().padStart(2, '0'),
          minutes: updatedMinutes.toString().padStart(2, '0'),
          seconds: updatedSeconds.toString().padStart(2, '0'),
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleStart = () => {
    if (!this.state.isActive) {
      this.setState({
        isActive: true,
      });
    }
  };

  handlePause = () => {
    this.setState({
      isActive: false,
    });
  };

  handleReset = () => {
    clearInterval(this.interval);
    this.setState({
      hours: '00',
      minutes: '25',
      seconds: '00',
      isActive: false,
    });
  };

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
        <h1 style={{fontSize: '2.5rem',
    marginBottom: '1rem',}}>Pomodoro Timer</h1>
        <div style={{fontSize: '3rem',
    marginBottom: '2rem',}}>
          {this.state.hours}:{this.state.minutes}:{this.state.seconds}
        </div>
        <div style={{display: 'flex',
    gap: '1rem',}}>
          <button
            style={{display: 'flex',
            gap: '1rem',}}
            onClick={this.handleStart}
            disabled={this.state.isActive}
          >
            Start
          </button>
          <button
            style={{display: 'flex',
            gap: '1rem',}}
            onClick={this.handlePause}
            disabled={!this.state.isActive}
          >
            Pause
          </button>
          <button style={{display: 'flex',
    gap: '1rem',}} onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
};