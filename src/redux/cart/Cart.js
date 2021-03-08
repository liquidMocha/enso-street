import {
  adjust,
  any,
  defaultTo,
  equals,
  filter,
  find,
  findIndex,
  isNil,
  lensProp,
  map,
  not,
  over,
  pipe,
  product,
  prop,
  propEq,
  props,
  sum,
} from 'ramda';
import OwnerBatch, {
  deselectItem as deselectOwnerBatchItem,
  selected,
  selectedItems,
  selectItem as selectOwnerBatchItem,
  size as batchSize,
} from './OwnerBatch';
import Owner from './Owner';
import Item from './Item';

export default class Cart {
  constructor(ownerBatches) {
    this.ownerBatches = ownerBatches.map(
      (ownerBatch) => new OwnerBatch({
        owner: new Owner({
          name: ownerBatch.ownerName,
          email: ownerBatch.ownerEmail,
        }),
        items: ownerBatch.items.map(
          (item) => new Item({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            rentalDailyPrice: item.rentalDailyPrice,
            quantity: item.quantity,
            canBeDelivered: item.canBeDelivered,
            deposit: item.deposit,
          }),
        ),
      }),
    );
  }
}

export const size = pipe(
  prop('ownerBatches'),
  map(batchSize),
  sum,
);

export const selectedBatch = pipe(
  prop('ownerBatches'),
  find(selected),
);

export const isPickupOnly = pipe(
  selectedBatch,
  selectedItems,
  map(prop('canBeDelivered')),
  any(equals(false)),
);

export const subtotal = pipe(
  selectedBatch,
  selectedItems,
  map(
    pipe(
      props(['rentalDailyPrice', 'quantity']),
      product,
    ),
  ),
  sum,
);

const findBatchWithItemId = (itemId) => pipe(
  prop('ownerBatches'),
  map(prop('items')),
  pipe(
    findIndex,
    any,
    propEq('id', itemId),
  ),
);

export const selectItem = (cart, itemId) => {
  const findBatchIn = findBatchWithItemId(itemId);
  const targetOwnerBatchIndex = findBatchIn(cart);

  return over(
    lensProp('ownerBatches'),
    adjust(targetOwnerBatchIndex, selectOwnerBatchItem(itemId)),
    cart,
  );
};

export const deselectItem = (cart, itemId) => {
  const findBatchIn = findBatchWithItemId(itemId);
  const targetOwnerBatchIndex = findBatchIn(cart);

  return over(
    lensProp('ownerBatches'),
    adjust(targetOwnerBatchIndex, deselectOwnerBatchItem(itemId)),
    cart,
  );
};

export const hasItemSelected = pipe(selectedBatch, isNil, not);

export const getSelectedItems = pipe(
  selectedBatch,
  prop('items'),
  defaultTo([]),
  filter(prop('selected')),
);
