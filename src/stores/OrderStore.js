import { observable } from 'mobx';

class OrderStore {
  @observable order = {}

  addToOrder(key, storeId) {
    this.order = {
      ...this.order,
      [key]: this.order[key] + 1 || 1
    }

    localStorage.setItem(`order-${storeId}`, JSON.stringify(this.order));
  }

  removeFromOrder(key, storeId){
    delete this.order[key];
    this.order = {...this.order};

    localStorage.setItem(`order-${storeId}`, JSON.stringify(this.order));
  }
}

const orderStore = new OrderStore();
export default orderStore;