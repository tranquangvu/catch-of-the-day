import React from 'react';
import AddFishForm from './AddFishForm'
import base from '../base'

class Investory extends React.Component {
  constructor() {
    super();

    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  logout() {
    base.unauth();

    this.setState({
      uid: null
    })
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, (err, authData) => this.authHandler(err, authData))
  }

  authHandler(err, authData) {
    console.log(authData);

    if(err) {
      console.log(err);
      return;
    }

    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin() {
    return(
      <nav className='login'>
        <h2>Investory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className='github' onClick={() => this.authenticate('github')}>
          Login With Github
        </button>
        <button className='facebook' onClick={() => this.authenticate('facebook')}>
          Login With Facebook
        </button>
        <button className='twitter' onClick={() => this.authenticate('twitter')}>
          Login With Facebook
        </button>
      </nav>
    );
  }

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
        <button onClick={() => this.props.removeFish(key)}>DELETE</button>
      </div>
    );
  }

  render() {
    if(!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      );
    }

    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          <button onClick={() => this.logout() }>Log out</button>
        </div>
      );
    }

    return (
      <div>
        <h2>Investory</h2>
        <button onClick={() => this.logout() }>Log out</button>
        {Object.keys(this.props.fishes).map((key) => this.renderInventory(key))}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSample}>Load Sample Fishes</button>
      </div>
    );
  }
}

Investory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func,
  removeFish: React.PropTypes.func,
  addFish: React.PropTypes.func,
  storeId: React.PropTypes.string
}

export default Investory;