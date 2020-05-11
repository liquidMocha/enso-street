import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import React from 'react';
import OrderLineItemIcon from './OrderLineItemIcon';
import './OrderReceivedCard.scss';
import { cancelOrderAction, confirmOrderAction } from '../../redux/order/OrderAction';

const OrderReceivedCard = ({ order }) => {
  const { startTime, returnTime } = order;
  const dispatch = useDispatch();

  const orderReceivedActions = () => {
    if (order.status === 'PENDING') {
      return (
        <section className="order-received-card__action-buttons">
          <button type="button" onClick={() => { dispatch(confirmOrderAction(order.id)); }}>Confirm</button>
          <button type="button" onClick={() => { dispatch(cancelOrderAction(order.id)); }}>Cancel</button>
        </section>
      );
    }

    if (order.status === 'CONFIRMED') {
      return (
        <section className="order-received-card__action-buttons">
          <button type="button">Confirm Return</button>
        </section>
      );
    }

    return null;
  };

  const orderStatus = () => {
    if (order.status === 'PENDING') {
      return (<span className="status-indicator--pending">Pending</span>);
    }
    if (order.status === 'CONFIRMED') {
      return (<span className="status-indicator--confirmed">Confirmed</span>);
    }
    if (order.status === 'EXPIRED') {
      return (<span className="status-indicator--expired">Expired</span>);
    }
    return <span className="status-indicator--cancelled">Cancelled</span>;
  };

  return (
    <section className="order-received-card">
      <div className="order-received-card__top-row">
        {order.renter.fullName}
        {orderStatus()}
      </div>
      <div>
        {`${startTime.getMonth() + 1}/${startTime.getDate()}/${startTime.getFullYear()}`}
        {' '}
        -
        {' '}
        {`${returnTime.getMonth() + 1}/${returnTime.getDate()}/${returnTime.getFullYear()}`}
      </div>
      <section className="order-received-card__order-line-items">
        {order.orderLineItems.map((orderLineItem) => (
          <OrderLineItemIcon
            imageUrl={orderLineItem.imageUrl}
            quantity={orderLineItem.quantity}
          />
        ))}
      </section>
      {orderReceivedActions()}
    </section>
  );
};

OrderReceivedCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    returnTime: PropTypes.instanceOf(Date).isRequired,
    orderLineItems: PropTypes.arrayOf(PropTypes.shape({
      imageUrl: PropTypes.string,
      quantity: PropTypes.number,
    })).isRequired,
    renter: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderReceivedCard;
