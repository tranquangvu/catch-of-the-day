import { observable } from 'mobx';
import { database } from '../firebase';
import sampleFishes from '../sample-fishes';

class FishStore {
  @observable fishes = {}

  loadFishes(storeId) {
    database.ref(`${storeId}/fishes`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const fishes = snapshot.val();
        this.fishes = fishes;
      }
    });
  }

  addFish(storeId, fish) {
    const timestamp = Date.now();
    const fishId = `fish-${timestamp}`;

    this.fishes = {
      ...this.fishes,
      [fishId]: fish
    }

    database.ref(`${storeId}/fishes/${fishId}`).set(fish);
  }

  updateFish(storeId, fishId, updatedFish){
    this.fishes = {
      ...this.fishes,
      [fishId]: updatedFish
    }

    database.ref(`${storeId}/fishes/${fishId}`).update(updatedFish);
  }

  removeFish(storeId, fishId) {
    delete this.fishes[fishId]
    this.fishes = {...this.fishes}
    database.ref(`${storeId}/fishes/${fishId}`).remove();
  }

  loadSample(storeId) {
    this.fishes = sampleFishes
    database.ref(`${storeId}/fishes`).set(sampleFishes);
  }
}

const fishStore = new FishStore();
export default fishStore;
