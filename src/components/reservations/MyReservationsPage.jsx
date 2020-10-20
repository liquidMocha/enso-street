import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservationsAction } from '../../redux/order/OrderAction';
import TitleBar from '../shared/TitleBar';
import OrderReceivedCard from '../ordersreceived/OrderReceivedCard';
import '../ordersreceived/OrdersReceivedPage.scss';

const MyReservationsPage = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.orders.reservations);

  useEffect(() => {
    dispatch(getReservationsAction());
  }, []);

  return (
    <section id="orders-received-page">
      <TitleBar />
      {reservations.map((order) => (
        <OrderReceivedCard order={order} forRenter />
      ))}
    </section>

  );
};

export default MyReservationsPage;
