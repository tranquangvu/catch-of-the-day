import { observable } from 'mobx';

class OrderStore {
  @observable order = {}

  addToOrder(orderId, fishId) {
    this.order = {
      ...this.order,
      [fishId]: this.order[fishId] + 1 || 1
    }
    this.storeToLocalStorage(orderId, JSON.stringify(this.order))
  }

  removeFromOrder(orderId, fishId) {
    delete this.order[fishId];
    this.order = {...this.order};
    this.storeToLocalStorage(orderId, JSON.stringify(this.order))
  }

  storeToLocalStorage(orderId, data) {
    localStorage.setItem(`order-${orderId}`, data);
  }

  getOrderFromLocalStorage(storeId) {
    const data = localStorage.getItem(`order-${storeId}`);
    
    if (data) {
      this.order = JSON.parse(data)
    }
  }
}

const orderStore = new OrderStore();
export default orderStore;
