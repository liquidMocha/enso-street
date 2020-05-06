export default class Order {
  constructor({
    status, isDeliver, startTime, returnTime, orderLineItems,
  }) {
    this.status = status;
    this.isDeliver = isDeliver;
    this.startTime = startTime;
    this.returnTime = returnTime;
    this.orderLineItems = orderLineItems;
  }
}
