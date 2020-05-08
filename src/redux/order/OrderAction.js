import { cancelOrder, getOrdersReceived } from '../../services/OrderService';

export const REFRESH_ORDER_RECEIVED = 'REFRESH_ORDER_RECEIVED';

const refreshOrderReceived = (orders) => ({
  type: REFRESH_ORDER_RECEIVED,
  orders,
});

export const getOrderReceivedAction = () => async (dispatch) => {
  dispatch(refreshOrderReceived(await getOrdersReceived()));
};

export const cancelOrderAction = (orderId) => async (dispatch) => {
  await cancelOrder(orderId);

  dispatch(getOrderReceivedAction());
};
