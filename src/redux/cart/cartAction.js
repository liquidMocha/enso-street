import { addItemToCart, getCart, removeOneInstanceFromCart } from '../../services/CartService';

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

export const refreshCart = () => async (dispatch) => {
  dispatch(updateCartAction(await getCart()));
};

export const addToCart = (itemId) => async (dispatch) => {
  await addItemToCart(itemId);
  dispatch(refreshCart());
};

export const removeOneInstance = (itemId) => async (dispatch) => {
  await removeOneInstanceFromCart(itemId);
  dispatch(refreshCart());
};
