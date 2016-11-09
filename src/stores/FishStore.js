import { observable } from 'mobx';
import { database } from '../firebase';

class FishStore {
  @observable fishes = {}

  loadFishes(storeId) {
    database.ref(`${storeId}/fishes`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.fishes = snapshot.val();
      }
    });
  }
}

const fishOrder = new FishStore();
export default fishOrder;