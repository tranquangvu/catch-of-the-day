import { observable } from 'mobx';

class OrderStore {
  @observable order = {}

  addToOrder(key, orderId) {
    this.order = {
      ...this.order,
      [key]: this.order[key] + 1 || 1
    }
    this.storeToLocalStorage(orderId, JSON.stringify(this.order))
  }

  removeFromOrder(key, orderId){
    delete this.order[key];
    this.order = {...this.order};
    this.storeToLocalStorage(orderId, JSON.stringify(this.order))
  }

  storeToLocalStorage(orderId, data) {
    localStorage.setItem(`order-${orderId}`, data);
  }

  getFromLocalStorage(storeId) {
    const data = localStorage.getItem(`order-${storeId}`);
    
    if (data) {
      this.order = JSON.parse(data)
    }
  }
}

const orderStore = new OrderStore();
export default orderStore;
