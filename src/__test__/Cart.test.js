import Cart, {
  getSelectedItems,
  hasItemSelected,
  isPickupOnly,
  selectedBatch,
  selectItem,
  size,
  subtotal,
} from '../redux/cart/Cart';
import Item from '../redux/cart/Item';

describe('Cart', () => {
  describe('constructor', () => {
    const ownerName1 = 'micheal scott';
    const ownerEmail1 = 'mscott@dm.com';
    const ownerName2 = 'jim helpert';
    const ownerEmail2 = 'jhelpert@dm.com';
    const item1 = {
      id: 1,
      title: 'title1',
      imageUrl: 'imageUrl1',
      rentalDailyPrice: 'rentalDailyPrice1',
      quantity: 'quantity1',
      canBeDelivered: 'canBeDelivered1',
      deposit: 'deposit1',
    };
    const item2 = {
      id: 2,
      title: 'title2',
      imageUrl: 'imageUrl2',
      rentalDailyPrice: 'rentalDailyPrice2',
      quantity: 'quantity2',
      canBeDelivered: 'canBeDelivered2',
      deposit: 'deposit2',
    };
    const item3 = {
      id: 3,
      title: 'title3',
      imageUrl: 'imageUrl3',
      rentalDailyPrice: 'rentalDailyPrice3',
      quantity: 'quantity3',
      canBeDelivered: 'canBeDelivered3',
      deposit: 'deposit3',
    };

    const cart = new Cart([
      {
        ownerName: ownerName1,
        ownerEmail: ownerEmail1,
        items: [item1],
      },
      {
        ownerName: ownerName2,
        ownerEmail: ownerEmail2,
        items: [item2, item3],
      },
    ]);

    const expected = {
      ownerBatches: [
        {
          owner: { name: ownerName1, email: ownerEmail1 },
          items: [new Item(item1)],
        },
        {
          owner: { name: ownerName2, email: ownerEmail2 },
          items: [new Item(item2), new Item(item3)],
        },
      ],
    };

    expect(cart).toEqual(expected);
  });

  describe('select item', () => {
    it('should select item by id', () => {
      const itemId = 10;
      const cart = {
        ownerBatches: [
          { items: [{ id: itemId, rentalDailyPrice: 2.00, quantity: 1 }] },
          { items: [{ id: 2, rentalDailyPrice: 1.00, quantity: 1 }] },
        ],
      };
      const actual = selectItem(cart, itemId);

      expect(actual.ownerBatches[0].items[0].selected).toBe(true);
      expect(actual.ownerBatches[1]).toEqual(cart.ownerBatches[1]);
    });
  });

  describe('has item selected', () => {
    it('should return true when any item is selected', () => {
      const cart = {
        ownerBatches: [
          {
            items: [{
              id: 1, rentalDailyPrice: 2.00, quantity: 1, selected: true,
            }],
          },
          { items: [{ id: 2, rentalDailyPrice: 1.00, quantity: 1 }] },
        ],
      };

      expect(hasItemSelected(cart)).toEqual(true);
    });

    it('should return false when no item is selected', () => {
      const cart = {
        ownerBatches: [
          {
            items: [{
              id: 1, rentalDailyPrice: 2.00, quantity: 1, selected: false,
            }],
          },
          {
            items: [{
              id: 2, rentalDailyPrice: 1.00, quantity: 1, selected: false,
            }],
          },
        ],
      };

      expect(hasItemSelected(cart)).toEqual(false);
    });
  });

  describe('selected items', () => {
    it('should return only and all selected items', () => {
      const selectedItem1 = { rentalDailyPrice: 1.00, quantity: 1, selected: true };
      const selectedItem2 = { rentalDailyPrice: 2.00, quantity: 2, selected: true };
      const cart = {
        ownerBatches: [
          {
            items: [
              selectedItem1,
              selectedItem2,
            ],
          },
          { items: [{ rentalDailyPrice: 3.00, quantity: 3 }] },
        ],
      };

      expect(getSelectedItems(cart)).toEqual([selectedItem1, selectedItem2]);
    });

    it('should return empty array if nothing is selected', () => {
      const cart = {
        ownerBatches: [
          {
            items: [
              { rentalDailyPrice: 1.00, quantity: 1 },
              { rentalDailyPrice: 2.00, quantity: 2 },
            ],
          },
          { items: [{ rentalDailyPrice: 3.00, quantity: 3 }] },
        ],
      };

      expect(getSelectedItems(cart)).toEqual([]);
    });
  });

  describe('selected batch', () => {
    it('return the selected batch', () => {
      const ownerName = 'micheal scott';
      const expected = {
        owner: { name: ownerName },
        items: [{ id: 1, selected: true }],
      };
      const cart = new Cart([
        { ownerName, items: [{ id: 2 }] },
        { ownerName, items: [{ id: 1 }] },
      ]);

      cart.ownerBatches[1].items[0].selected = true;
      const actual = selectedBatch(cart);

      expect(actual).toEqual(expected);
    });

    it('return the selected batch', () => {
      const cart = new Cart([
        { items: [{ id: 2 }] },
        { items: [{ id: 1 }] },
      ]);
      const actual = selectedBatch(cart);

      expect(actual).toBeUndefined();
    });
  });

  describe('size', () => {
    it('should sum up all owner batches\' sizes', () => {
      const cart = {
        ownerBatches: [
          {
            items: [{
              id: 1, rentalDailyPrice: 2.00, quantity: 4, selected: false,
            }, {
              id: 3, rentalDailyPrice: 2.00, quantity: 1, selected: false,
            }],
          },
          {
            items: [{
              id: 2, rentalDailyPrice: 1.00, quantity: 3, selected: false,
            }],
          },
        ],
      };

      expect(size(cart)).toEqual(8);
    });
  });

  describe('subtotal', () => {
    it('should add up all selected items in the selected batch', () => {
      const cart = {
        ownerBatches: [
          {
            items: [
              { rentalDailyPrice: 1.00, quantity: 1 },
              { rentalDailyPrice: 1.50, quantity: 2, selected: true },
              { rentalDailyPrice: 2.00, quantity: 3, selected: true },
            ],
          },
          { items: [{ rentalDailyPrice: 1.00, quantity: 1 }] },
        ],
      };

      const actual = subtotal(cart);

      expect(actual).toEqual(9);
    });

    it('should return 0 if nothing is selected', () => {
      const cart = {
        ownerBatches: [
          { items: [{ rentalDailyPrice: 2.00, quantity: 1 }] },
          { items: [{ rentalDailyPrice: 1.00, quantity: 1 }] },
        ],
      };

      const actual = subtotal(cart);

      expect(actual).toEqual(0);
    });
  });

  describe('is cart pickup only', () => {
    it('should return true if any selected item cannot be delivered', () => {
      const cart = {
        ownerBatches: [
          {
            items: [
              {
                rentalDailyPrice: 2.00, quantity: 1, selected: true, canBeDelivered: false,
              },
              {
                rentalDailyPrice: 2.00, quantity: 1, selected: true, canBeDelivered: true,
              },
            ],
          },
          { items: [{ rentalDailyPrice: 1.00, quantity: 1 }] },
        ],
      };

      expect(isPickupOnly(cart)).toEqual(true);
    });

    it('should return false if all selected item can be delivered', () => {
      const cart = {
        ownerBatches: [
          {
            items: [
              {
                rentalDailyPrice: 2.00, quantity: 1, selected: false, canBeDelivered: false,
              },
              {
                rentalDailyPrice: 2.00, quantity: 1, selected: true, canBeDelivered: true,
              },
              {
                rentalDailyPrice: 2.00, quantity: 1, selected: true, canBeDelivered: true,
              },
            ],
          },
          { items: [{ rentalDailyPrice: 1.00, quantity: 1 }] },
        ],
      };

      expect(isPickupOnly(cart)).toEqual(false);
    });
  });
});
