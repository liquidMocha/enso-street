import { addItemToCart, getCart } from '../../services/CartService';

export const UPDATE_CART = 'UPDATE_CART';

const updateCartAction = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const addToCart = (itemId) => async (dispatch) => {
  await addItemToCart(itemId);
  const cart = await getCart();
  dispatch(updateCartAction(cart));
};

export const refreshCart = () => async (dispatch) => {
  dispatch(updateCartAction(await getCart()));
};
