import React from 'react';
import AddFishForm from './AddFishForm';
import firebase from 'firebase/app';
import { database, auth } from '../firebase';
import { observer } from 'mobx-react';
import fishStore from '../stores/FishStore';

@observer class Investory extends React.Component {
  constructor() {
    super();

    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  logout() {
    auth.signOut();
    this.setState({ uid: null });
  }

  authenticate(provider) {
    auth.signInWithPopup(provider)
        .then((authData) => 
          this.authHandler(authData)
        )
        .catch((err) => {
          console.log(err);
        });
  }

  authHandler(authData) {
    const storeRef = database.ref(this.props.storeId);

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
        <button className='github' onClick={() => this.authenticate(new firebase.auth.GithubAuthProvider())}>
          Login With Github
        </button>
        <button className='facebook' onClick={() => this.authenticate(new firebase.auth.FacebookAuthProvider())}>
          Login With Facebook
        </button>
        <button className='twitter' onClick={() => this.authenticate(new firebase.auth.GoogleAuthProvider())}>
          Login With Google
        </button>
      </nav>
    );
  }

  handleChange(e, storeId, key) {
    const fish = fishStore.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    }
    fishStore.updateFish(storeId, key, updatedFish);
  }

  renderInventory(key) {
    const { storeId } = this.props
    const fish = fishStore.fishes[key]

    return (
      <div className='fish-edit' key={key}>
        <input
          type='text'
          name='name'
          placeholder='Fish Name'
          value={fish.name}
          onChange={(e) => this.handleChange(e, storeId, key)}
        />
        <input
          type='number'
          name='price'
          placeholder='Fish Price'
          value={fish.price}
          onChange={(e) => this.handleChange(e, storeId, key)}
        />
        <select
          type='text'
          name='status'
          placeholder='Fish status'
          value={fish.status}
          onChange={(e) => this.handleChange(e, storeId, key)}
        >
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea
          type='text'
          name='desc'
          placeholder='Fish Desc'
          value={fish.desc}
          onChange={(e) => this.handleChange(e, storeId, key)}
        />
        <input
          type='text'
          name='image'
          placeholder='Fish Image'
          value={fish.image}
          onChange={(e) => this.handleChange(e, storeId, key)}
        />
        <button onClick={() => fishStore.removeFish(storeId, key)}>Remove</button>
      </div>
    );
  }

  render() {
    const { storeId } = this.props
    const { uid, owner } = this.state

    if(!uid) {
      return (
        <div>{this.renderLogin()}</div>
      );
    }

    if(uid !== owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          <button onClick={() => this.logout()}>Log out</button>
        </div>
      );
    }

    return (
      <div>
        <h2>Investory</h2>
        <button onClick={() => this.logout()}>Log out</button>
        {Object.keys(fishStore.fishes).map((key) => this.renderInventory(key))}
        <AddFishForm storeId={storeId}/>
        <button onClick={() => fishStore.loadSample(storeId)}>Load Sample Fishes</button>
      </div>
    );
  }
}

Investory.propTypes = {
  storeId: React.PropTypes.string
}

export default Investory;
