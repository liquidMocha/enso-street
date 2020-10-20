import _ from 'lodash';
import { REFRESH_ORDER_RECEIVED, REFRESH_RESERVATIONS } from './OrderAction';
import OrderLineItem from './OrderLineItem';
import Order from './Order';

const initialState = {
  orders: [],
  reservations: [],
};

export default (state = initialState, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case REFRESH_ORDER_RECEIVED: {
      const orders = action.orders.map((order) => new Order({
        id: order.id,
        status: order.status,
        startTime: new Date(order.startTime),
        returnTime: new Date(order.returnTime),
        renter: order.renter,
        executor: order.executor,
        orderLineItems: order.orderLineItems.map(
          (orderLineItem) => new OrderLineItem(
            orderLineItem.orderItem.imageUrl,
            orderLineItem.quantity,
          ),
        ),
      }));
      return { ...newState, orders };
    }
    case REFRESH_RESERVATIONS: {
      const reservations = action.reservations.map((order) => new Order({
        id: order.id,
        status: order.status,
        startTime: new Date(order.startTime),
        returnTime: new Date(order.returnTime),
        renter: order.renter,
        executor: order.executor,
        orderLineItems: order.orderLineItems.map(
          (orderLineItem) => new OrderLineItem(
            orderLineItem.orderItem.imageUrl,
            orderLineItem.quantity,
          ),
        ),
      }));
      return { ...newState, reservations };
    }
    default: {
      return state;
    }
  }
};
