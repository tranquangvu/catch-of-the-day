import React from 'react';
import { database } from '../firebase';
import { observer } from 'mobx-react';
import Header from './Header';
import Order from './Order';
import Investory from './Investory';
import Fish from './Fish';
import orderStore from '../stores/OrderStore';
import fishStore from '../stores/FishStore';

@observer class App extends React.Component {
  componentWillMount() {
    const { storeId } = this.props.params;
    fishStore.loadFishes(storeId);
    orderStore.getOrderFromLocalStorage(storeId);
  }

  componentWillUnmount() {
    database.ref(`${this.props.params.storeId}/fishes`).off();
  }

  render() {
    const { params } = this.props;

    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header age="5000" cool={true} tagline='Fresh SeaFood Market'/>
          <ul className='list-of-fishes'>
            { 
              Object.keys(fishStore.fishes)
                    .map(key => <Fish key={key} fishId={key} storeId={params.storeId}/>)
            }
          </ul>
        </div>
        <Order storeId={params.storeId} />
        <Investory storeId={params.storeId} />
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
