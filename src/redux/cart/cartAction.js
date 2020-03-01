import { addItemToCart, getCart } from '../../services/CartService';

export const UPDATE_CART = 'UPDATE_CART';
export const ADD_TO_CART_SELECTION = 'ADD_TO_CART_SELECTION';

const updateCartAction = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const addToCartSelectionAction = (itemId) => ({
  type: ADD_TO_CART_SELECTION,
  itemId,
});

export const addToCart = (itemId) => async (dispatch) => {
  await addItemToCart(itemId);
  const cart = await getCart();
  dispatch(updateCartAction(cart));
};

export const refreshCart = () => async (dispatch) => {
  dispatch(updateCartAction(await getCart()));
};
