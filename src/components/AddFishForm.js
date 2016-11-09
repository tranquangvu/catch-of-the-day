import React from 'react';
import fishStore from '../stores/FishStore';

class AddFishForm extends React.Component {
  createFish(e, storeId) {
    e.preventDefault();

    const fish = {
      name: this.name.value,
      price: parseInt(this.price.value, 10),
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }

    fishStore.addFish(storeId, fish);
    this.fishForm.reset();
  }

  render() {
    const { storeId } = this.props

    return (
      <form ref={(input) => this.fishForm = input} className='fish-edit' onSubmit={(e) => this.createFish(e, storeId)}>
        <input
          type='text'
          placeholder='Fish Name'
          ref={(input) => this.name = input}
        />
        <input
          type='number'
          placeholder='Fish Price'
          ref={(input) => this.price = input}
        />
        <select ref={(input) => this.status = input}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea
          placeholder='Fish Desc'
          ref={(input) => this.desc = input}
        />
        <input
          ref={(input) => this.image = input}
          type='text'
          placeholder='Fish Image'
        />
        <button type='submit'>+ Add Item</button>
      </form>
    );
  }
}

AddFishForm.propTypes = {
  storeId: React.PropTypes.string
}

export default AddFishForm;
