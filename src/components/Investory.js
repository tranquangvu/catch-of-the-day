import React from 'react';
import AddFishForm from './AddFishForm'

class Investory extends React.Component {
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]

    return (
      <div className='fish-edit' key={key}>
        <input type='text' name='name' placeholder='Fish Name' value={fish.name} onChange={(e) => this.handleChange(e, key)}/>
        <input type='text' name='price' placeholder='Fish Price' value={fish.price} onChange={(e) => this.handleChange(e, key)}/>
        <select type='text' name='status' placeholder='Fish status' value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea type='text' name='desc' placeholder='Fish Desc' value={fish.desc} onChange={(e) => this.handleChange(e, key)}/>
        <input type='text' name='image' placeholder='Fish Image' value={fish.image} onChange={(e) => this.handleChange(e, key)}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Investory</h2>
        {Object.keys(this.props.fishes).map((key) => this.renderInventory(key))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSample}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Investory;