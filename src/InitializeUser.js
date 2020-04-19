import { getUserProfileAction } from './redux/user/UserAction';
import { refreshCart } from './redux/cart/cartAction';

export default (dispatch) => {
  dispatch(getUserProfileAction());
  dispatch(refreshCart());
};
