import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import React from 'react';
import OrderLineItemIcon from './OrderLineItemIcon';
import './OrderReceivedCard.scss';
import {
  cancelOrderAction,
  completeOrderAction,
  confirmOrderAction,
} from '../../redux/order/OrderAction';

const OrderReceivedCard = ({ order, forRenter }) => {
  const { startTime, returnTime } = order;
  const dispatch = useDispatch();

  const orderReceivedActions = () => {
    if (forRenter) {
      return null;
    }

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
          <button type="button" onClick={() => { dispatch(completeOrderAction(order.id)); }}>Confirm Return</button>
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
      return (<span className="status-indicator--confirmed">Active</span>);
    }
    if (order.status === 'EXPIRED') {
      return (<span className="status-indicator--expired">Expired</span>);
    }
    if (order.status === 'COMPLETED') {
      return (<span className="status-indicator--completed">Completed</span>);
    }
    return <span className="status-indicator--cancelled">Cancelled</span>;
  };

  return (
    <section className="order-received-card">
      <div className="order-received-card__top-row">
        {forRenter ? order.executor.alias : order.renter.fullName}
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
    executor: PropTypes.shape({
      alias: PropTypes.string.isRequired,
    }),
  }).isRequired,
  forRenter: PropTypes.bool,
};

OrderReceivedCard.defaultProps = {
  forRenter: false,
};

export default OrderReceivedCard;
