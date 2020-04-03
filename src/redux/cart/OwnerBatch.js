export default class OwnerBatch {
  constructor({ owner, items }) {
    this.owner = owner;
    this.items = items;
  }

  deselectItem(itemId) {
    this.items.find((item) => item.id === itemId).deselect();
  }

  selectItem(itemId) {
    const itemToSelect = this.items.find((item) => item.id === itemId);
    if (itemToSelect) {
      itemToSelect.select();
    }
  }

  hasItem(itemId) {
    return this.items.some((item) => item.id === itemId);
  }

  size() {
    return this.items.reduce((aggregate, item) => aggregate + item.quantity, 0);
  }

  selected() {
    return this.items.some((item) => item.selected);
  }
}
