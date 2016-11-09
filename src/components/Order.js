import React from 'react';
import Timer from './Timer';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { observer } from 'mobx-react';
import orderStore from '../stores/OrderStore';
import fishStore from '../stores/FishStore';

@observer
class Order extends React.Component {
  renderOrder(key, storeId) {
    const fish = fishStore.fishes[key]
    const count = orderStore.order[key]
    const removeButton = <button onClick={() => orderStore.removeFromOrder(key, storeId)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available
        </li>
      );
    }

    return (
      <li key={key}>
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
    const orderIds = Object.keys(orderStore.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishStore.fishes[key];
      const count = orderStore.order[key];

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
          {orderIds.map((key) => this.renderOrder(key, this.props.storeId))}
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
