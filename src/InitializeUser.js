import { getUserProfileAction } from './redux/user/UserAction';
import { updateCartItemCount } from './redux/cart/cartAction';

export default (dispatch) => {
  dispatch(getUserProfileAction());
  dispatch(updateCartItemCount());
};
