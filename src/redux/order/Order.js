export default class Order {
  constructor({
    id, status, isDeliver, startTime, returnTime, orderLineItems,
  }) {
    this.id = id;
    this.status = status;
    this.isDeliver = isDeliver;
    this.startTime = startTime;
    this.returnTime = returnTime;
    this.orderLineItems = orderLineItems;
  }
}
