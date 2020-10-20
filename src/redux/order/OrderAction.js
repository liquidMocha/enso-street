import {
  cancelOrder,
  completeOrder,
  confirmOrder,
  getOrdersReceived,
  getReservations,
} from '../../services/OrderService';

export const REFRESH_ORDER_RECEIVED = 'REFRESH_ORDER_RECEIVED';
export const REFRESH_RESERVATIONS = 'REFRESH_RESERVATIONS';

const refreshOrderReceived = (orders) => ({
  type: REFRESH_ORDER_RECEIVED,
  orders,
});

const refreshReservations = (reservations) => ({
  type: REFRESH_RESERVATIONS,
  reservations,
});

export const getOrderReceivedAction = () => async (dispatch) => {
  dispatch(refreshOrderReceived(await getOrdersReceived()));
};

export const getReservationsAction = () => async (dispatch) => {
  dispatch(refreshReservations(await getReservations()));
};

export const cancelOrderAction = (orderId) => async (dispatch) => {
  await cancelOrder(orderId);

  dispatch(getOrderReceivedAction());
};

export const confirmOrderAction = (orderId) => async (dispatch) => {
  await confirmOrder(orderId);

  dispatch(getOrderReceivedAction());
};

export const completeOrderAction = (orderId) => async (dispatch) => {
  await completeOrder(orderId);

  dispatch(getOrderReceivedAction());
};
