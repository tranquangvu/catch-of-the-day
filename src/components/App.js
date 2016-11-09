import React from 'react';
import Header from './Header';
import Order from './Order';
import Investory from './Investory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import { database } from '../firebase';
import { observer } from 'mobx-react';
import orderStore from '../stores/OrderStore';

@observer
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    const { storeId } = this.props.params;

    database.ref(`${storeId}/fishes`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          fishes: snapshot.val()
        });
      }
    });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      orderStore.order = JSON.parse(localStorageRef)
    }
  }

  componentWillUnmount() {
    const { storeId } = this.props.params;
    database.ref(`${storeId}/fishes`).off();
  }

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    const fishId = `fish-${timestamp}`;

    fishes[fishId] = fish;
    this.setState({ fishes });

    const { storeId } = this.props.params;
    database.ref(`${storeId}/fishes/${fishId}`).set(fish);
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    const { storeId } = this.props.params;

    fishes[key] = updatedFish;
    this.setState({ fishes }); 

    database.ref(`${storeId}/fishes/${key}`).update(updatedFish);
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    const { storeId } = this.props.params;

    fishes[key] = null;
    this.setState({ fishes }); 

    database.ref(`${storeId}/fishes/${key}`).remove();
  }

  loadSample() {
    const { storeId } = this.props.params;

    this.setState({
      fishes: sampleFishes
    });

    database.ref(`${storeId}/fishes`).set(sampleFishes);
  }

  render() {
    const { fishes } = this.state;
    const { params } = this.props;

    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header age="5000" cool={true} tagline='Fresh SeaFood Market'/>
          <ul className='list-of-fishes'>
            { Object
                .keys(fishes)
                .map(key => 
                  <Fish key={key} 
                    details={fishes[key]}
                    index={key}
                    params={params}
                  />)
            }
          </ul>
        </div>
        <Order 
          fishes={fishes}
          params={params}
        />
        <Investory
          addFish={(fish) => this.addFish(fish)}
          loadSample={() => this.loadSample()}
          fishes={this.state.fishes}
          updateFish={(key, fish) => this.updateFish(key, fish)}
          removeFish={(key) => this.removeFish(key)}
          storeId={params.storeId}
        />
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.shape({
    storeId: React.PropTypes.string.isRequired
  })
}

export default App;
