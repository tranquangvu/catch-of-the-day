import React from 'react';
import { observer } from 'mobx-react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import orderStore from '../stores/OrderStore';
import fishStore from '../stores/FishStore';
import Timer from './Timer';

@observer class Order extends React.Component {
  renderOrder(fishId, storeId) {
    const fish = fishStore.fishes[fishId]
    const count = orderStore.order[fishId]
    const removeButton = <button onClick={() => orderStore.removeFromOrder(storeId, fishId)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return (
        <li key={fishId}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available
        </li>
      );
    }

    return (
      <li key={fishId}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          x {fish.name} {removeButton}
        </span>
        <span className='price'>{formatPrice(count*fish.price)}</span>
      </li>
    );
  }

  render() {
    const fishIds = Object.keys(orderStore.order);
    const total = fishIds.reduce((prevTotal, fishId) => {
      const fish = fishStore.fishes[fishId];
      const count = orderStore.order[fishId];

      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }

      return prevTotal;
    }, 0);

    return (
      <div className='order-wrap'>
        <h2>Your Order</h2>
        <CSSTransitionGroup
            className="order"
            component="ul"
            transitionName="order"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
          {fishIds.map((fishId) => this.renderOrder(fishId, this.props.storeId))}
          <li className='total'>
            <strong>Total: </strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
        <Timer/>
      </div>
    );
  }
}

Order.propTypes = {
  storeId: React.PropTypes.string
}

export default Order;
