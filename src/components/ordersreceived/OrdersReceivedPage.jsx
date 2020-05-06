import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../shared/TitleBar';
import { getOrderReceivedAction } from '../../redux/order/OrderAction';
import OrderReceivedSummary from './OrderReceivedSummary';
import OrderReceivedCard from './OrderReceivedCard';
import './OrdersReceivedPage.scss';

const OrdersReceivedPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrderReceivedAction());
  }, []);

  return (
    <section id="orders-received-page">
      <TitleBar />
      <OrderReceivedSummary
        numberOfOrders={orders.length}
      />
      {orders.map((order) => (
        <OrderReceivedCard
          orderLineItems={order.orderLineItems}
          returnTime={new Date(order.returnTime)}
          startTime={new Date(order.startTime)}
          status={order.status}
        />
      ))}
    </section>
  );
};

export default OrdersReceivedPage;
