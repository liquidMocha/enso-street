export default class Order {
  constructor({
    id, status, isDeliver, startTime, returnTime, orderLineItems, renter, executor,
  }) {
    this.id = id;
    this.status = status;
    this.isDeliver = isDeliver;
    this.startTime = startTime;
    this.returnTime = returnTime;
    this.orderLineItems = orderLineItems;
    this.renter = renter;
    this.executor = executor;
  }
}
