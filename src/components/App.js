import React from 'react';
import Header from './Header';
import Order from './Order';
import Investory from './Investory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'

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

  loadSample() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    const order = {...this.state.order};

    order[key] = order[key] + 1 || 1;
    this.setState({order});
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header age="5000" cool={true} tagline='Fresh SeaFood Market'/>
          <ul className='list-of-fishes'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} 
                                  details={this.state.fishes[key]}
                                  index={key}
                                  addToOrder={(key) => this.addToOrder(key)}
                            />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Investory addFish={(fish) => this.addFish(fish)} loadSample={() => this.loadSample()}/>
      </div>
    );
  }
}

export default App;