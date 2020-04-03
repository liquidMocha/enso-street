export default class OwnerBatch {
  constructor({ owner, items }) {
    this.owner = owner;
    this.items = items;
  }

  hasItem = (itemId) => {
    return this.items.some((item) => item.id === itemId);
  };

  size = () => {
    return this.items.reduce((aggregate, item) => aggregate + item.quantity, 0)
  }
}
