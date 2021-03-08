import Item, { deselect, select } from '../redux/cart/Item';

describe('item', () => {
  it('should select', () => {
    const item = new Item({ id: 2 });

    const actual = select(item);

    expect(actual.selected).toEqual(true);
    expect(actual.id).toEqual(2);
  });

  it('should deselect', () => {
    const item = new Item({ id: 1 });

    item.selected = true;
    const actual = deselect(item);

    expect(actual.selected).toEqual(false);
    expect(actual.id).toEqual(1);
  });
});
