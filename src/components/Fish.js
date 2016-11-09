import React from 'react';
import { formatPrice } from '../helpers';
import { observer } from 'mobx-react';
import orderStore from '../stores/OrderStore';

@observer
class Fish extends React.Component {
  render() {
    const { details, index, params } = this.props
    const isAvailable = details.status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'

    return (
      <li className='menu-fish'>
        <img src={details.image} alt={details.name} />
        <h3 className='fish-name'>
          {details.name}
          <span className='price'>{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={() => orderStore.addToOrder(index, params.storeId)}>{buttonText}</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: React.PropTypes.shape({
    name: React.PropTypes.string,
    price: React.PropTypes.number,
    status: React.PropTypes.string,
    desc: React.PropTypes.string,
    image: React.PropTypes.string,
  }).isRequired,
  index: React.PropTypes.string.isRequired,
  params: React.PropTypes.shape({
    storeId: React.PropTypes.string
  })
}

export default Fish;
