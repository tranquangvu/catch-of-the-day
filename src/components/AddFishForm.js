import React from 'react';

class AddFishForm extends React.Component {
  createFish(e) {
    e.preventDefault();

    const fish = {
      name: this.name.value,
      price: parseInt(this.price.value, 10),
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }

    this.props.addFish(fish);
    this.fishForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.fishForm = input} className='fish-edit' onSubmit={(e) => this.createFish(e)}>
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
  addFish: React.PropTypes.func.isRequired
}

export default AddFishForm;
