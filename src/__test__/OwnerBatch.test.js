import { deselectItem, selected, selectedItems, selectItem, size, } from '../redux/cart/OwnerBatch';

describe('OwnerBatch', () => {
  describe('size', () => {
    it('should count all items\' quantities', () => {
      const ownerBatch = {
        items: [
          { quantity: 2 },
          { quantity: 3 },
        ],
      };

      expect(size(ownerBatch)).toEqual(5);
    });
  });

  describe('is batch selected', () => {
    it('true if any is selected', () => {
      const ownerBatch = {
        items: [
          { selected: true },
          { selected: false },
        ],
      };

      expect(selected(ownerBatch)).toEqual(true);
    });

    it('false if none is selected', () => {
      const ownerBatch = {
        items: [
          { selected: false },
          { selected: false },
        ],
      };

      expect(selected(ownerBatch)).toEqual(false);
    });

    it('false if none is selected', () => {
      const ownerBatch = {
        items: [],
      };

      expect(selected(ownerBatch)).toEqual(false);
    });
  });

  describe('get all selected items', () => {
    it('should return all and only items that are selected', () => {
      const ownerBatch = {
        items: [
          { selected: true, itemId: 1 },
          { selected: false, itemId: 2 },
          { selected: true, itemId: 3 },
        ],
      };
      const actual = selectedItems(ownerBatch);

      expect(actual).toEqual([
        { selected: true, itemId: 1 },
        { selected: true, itemId: 3 },
      ]);
    });

    it('should return empty array if given undefined', () => {
      expect(selectedItems(undefined)).toEqual([]);
    });
  });

  describe('select item', () => {
    it('should select item', () => {
      const ownerBatch = {
        items: [
          { selected: true, id: 1 },
          { selected: false, id: 2 },
          { selected: false, id: 3 },
        ],
      };

      const actual = selectItem(3, ownerBatch);

      expect(actual.items[2].selected).toEqual(true);
    });
  });

  describe('deselect item', () => {
    it('should deselect item', () => {
      const ownerBatch = {
        items: [
          { selected: true, id: 1 },
          { selected: false, id: 2 },
          { selected: false, id: 3 },
        ],
      };

      const actual = deselectItem(1, ownerBatch);

      expect(actual.items[0].selected).toEqual(false);
    });
  });
});
