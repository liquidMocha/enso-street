import { assoc } from 'ramda';

export default class Item {
  constructor({
    id, title, rentalDailyPrice, imageUrl, quantity, canBeDelivered, deposit,
  }) {
    this.id = id;
    this.title = title;
    this.rentalDailyPrice = rentalDailyPrice;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
    this.canBeDelivered = canBeDelivered;
    this.selected = false;
    this.deposit = deposit;
  }
}

export const select = assoc('selected', true);

export const deselect = assoc('selected', false);
