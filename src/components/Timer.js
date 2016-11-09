import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer class Timer extends React.Component {
  @observable secondsElapsed = 0

  componentDidMount() {
    this.interval = setInterval(() => this.secondsElapsed++, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>Seconds Elapsed: {this.secondsElapsed}</div>
    );
  }
}

export default Timer;