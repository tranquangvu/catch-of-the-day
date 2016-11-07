import React from 'react';
import Header from './Header';
import Order from './Order';
import Investory from './Investory';

class App extends React.Component {
  constructor() {
    super();

    // init state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};

    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    this.setState({ fishes });
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header age="5000" cool={true} tagline='Fresh SeaFood Market'/>
        </div>
        <Order/>
        <Investory addFish={(fish) => this.addFish(fish)}/>
      </div>
    );
  }
}

export default App;