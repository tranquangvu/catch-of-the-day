import React from 'react';
import Header from './Header';
import Order from './Order';
import Investory from './Investory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes'
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    // init state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};

    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    this.setState({ fishes });
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};

    fishes[key] = updatedFish
    this.setState({ fishes }); 
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes }); 
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params}/>
        <Investory addFish={(fish) => this.addFish(fish)} loadSample={() => this.loadSample()} fishes={this.state.fishes} updateFish={(key, fish) => this.updateFish(key, fish)} removeFish={(key) => this.removeFish(key)}/>
      </div>
    );
  }
}

export default App;