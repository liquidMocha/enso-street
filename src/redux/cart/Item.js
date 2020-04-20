export default class Item {
  constructor({
    id, title, rentalDailyPrice, imageUrl, quantity, canBeDelivered,
  }) {
    this.id = id;
    this.title = title;
    this.rentalDailyPrice = rentalDailyPrice;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    this.canBeDelivered = canBeDelivered;
    this.selected = false;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }
}
