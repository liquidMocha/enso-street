import OwnerBatch from './OwnerBatch';
import Owner from './Owner';
import Item from './Item';

export default class Cart {
  constructor(ownerBatches) {
    this.ownerBatches = ownerBatches.map((ownerBatch) => new OwnerBatch({
      owner: new Owner({ name: ownerBatch.owner.name, email: ownerBatch.owner.email }),
      items: ownerBatch.items.map((item) => new Item({
        id: item.id, title: item.title, imageUrl: item.imageUrl, rentalDailyPrice: item.rentalDailyPrice, quantity: item.quantity,
      })),
    }));
  }
}
