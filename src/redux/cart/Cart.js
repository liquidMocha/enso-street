import OwnerBatch from './OwnerBatch';
import Owner from './Owner';
import Item from './Item';

export default class Cart {
  constructor(ownerBatches) {
    this.ownerBatches = ownerBatches.map(
      (ownerBatch) => new OwnerBatch({
        owner: new Owner({ name: ownerBatch.ownerName, email: ownerBatch.ownerEmail }),
        items: ownerBatch.items.map(
          (item) => new Item({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            rentalDailyPrice: item.rentalDailyPrice,
            quantity: item.quantity,
            canBeDelivered: item.canBeDelivered,
          }),
        ),
      }),
    );
  }

  pickupOnly() {
    return this.getSelectedBatch().items
      .filter((item) => item.selected)
      .some((item) => !item.canBeDelivered);
  }

  getSelectedItems() {
    return this.getSelectedBatch().items.filter((item) => item.selected);
  }

  hasItemSelected() {
    return !!this.getSelectedBatch();
  }

  getSelectedBatch() {
    return this.ownerBatches.find((ownerBatch) => ownerBatch.selected());
  }

  deselectItem(itemId) {
    this.getSelectedBatch().deselectItem(itemId);
  }

  selectItem(itemId) {
    const selectedBatch = this.getSelectedBatch();
    if (selectedBatch) {
      selectedBatch.selectItem(itemId);
    } else {
      this.ownerBatches.find((batch) => batch.hasItem(itemId)).selectItem(itemId);
    }
  }
}
