import {
  adjust,
  any,
  curry,
  defaultTo,
  filter,
  findIndex,
  lensProp,
  map,
  over,
  pipe,
  prop,
  propEq,
  sum,
} from 'ramda';
import { deselect, select } from './Item';

export default class OwnerBatch {
  constructor({ owner, items }) {
    this.owner = owner;
    this.items = items;
  }
}

export const size = pipe(
  prop('items'),
  map(prop('quantity')),
  sum,
);

export const selected = pipe(
  prop('items'),
  any(prop('selected')),
);

export const selectedItems = pipe(
  prop('items'),
  defaultTo([]),
  filter(prop('selected')),
);

const selectItemInList = curry((id, items) => adjust(
  findIndex(propEq('id', id), items),
  select,
  items,
));

const deselectItemInList = curry((id, items) => adjust(
  findIndex(propEq('id', id), items),
  deselect,
  items,
));

export const selectItem = curry((itemId, ownerBatch) => over(
  lensProp('items'),
  selectItemInList(itemId),
  ownerBatch,
));

export const deselectItem = curry((itemId, ownerBatch) => over(
  lensProp('items'),
  deselectItemInList(itemId),
  ownerBatch,
));
