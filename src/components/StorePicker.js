import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.goToStore = this.goToStore.bind(this)
  // }

  goToStore(e) {
    e.preventDefault();

    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className='store-selector' onSubmit={(e) => this.goToStore(e)}>
        <h2>Plase Enter A Store</h2>
        <input
          type='text'
          required={true}
          placeholder='Store Name'
          defaultValue={getFunName()}
          ref={(input) => {this.storeInput = input}}
        />
        <button type='submit'>Visit Store</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;