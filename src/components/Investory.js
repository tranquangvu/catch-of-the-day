import React from 'react';
import AddFishForm from './AddFishForm'

class Investory extends React.Component {
  render() {
    return (
      <div>
        <h2>Investory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSample}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Investory;