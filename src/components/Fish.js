import React from 'react';
import { observer } from 'mobx-react';
import { formatPrice } from '../helpers';
import orderStore from '../stores/OrderStore';
import fishStore from '../stores/FishStore';

@observer class Fish extends React.Component {
  render() {
    const { fishId, storeId } = this.props
    const fish = fishStore.fishes[fishId]
    const isAvailable = fish.status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'

    return (
      <li className='menu-fish'>
        <img src={fish.image} alt={fish.name} />
        <h3 className='fish-name'>
          {fish.name}
          <span className='price'>{formatPrice(fish.price)}</span>
        </h3>
        <p>{fish.desc}</p>
        <button disabled={!isAvailable} onClick={() => orderStore.addToOrder(storeId, fishId)}>{buttonText}</button>
      </li>
    );
  }
}

Fish.propTypes = {
  fishId: React.PropTypes.string.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Fish;
