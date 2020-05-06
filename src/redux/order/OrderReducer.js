import { REFRESH_ORDER_RECEIVED } from './OrderAction';
import OrderLineItem from './OrderLineItem';
import Order from './Order';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REFRESH_ORDER_RECEIVED: {
      const orders = action.orders.map((order) => new Order({
        status: order.status,
        startTime: order.startTime,
        returnTime: order.returnTime,
        orderLineItems: order.orderLineItems.map(
          (orderLineItem) => new OrderLineItem(orderLineItem.orderItem.imageUrl, orderLineItem.quantity),
        ),
      }));
      return { orders };
    }
    default: {
      return state;
    }
  }
};
