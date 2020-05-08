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
          <button onClick={() => { dispatch(confirmOrderAction(order.id)); }}>Confirm</button>
          <button onClick={() => { dispatch(cancelOrderAction(order.id)); }}>Cancel</button>
        </section>
      );
    } if (order.status === 'CONFIRMED') {
      return (
        <section className="order-received-card__action-buttons">
          <button>Confirm Return</button>
        </section>
      );
    }
    return null;
  };

  const statusIndicator = () => {
    if (order.status === 'PENDING') {
      return (<span className="status-indicator--pending">Pending</span>);
    }
    if (order.status === 'CONFIRMED') {
      return (<span className="status-indicator--confirmed">Confirmed</span>);
    }
    return <span className="status-indicator--cancelled">Cancelled</span>;
  };

  return (
    <section className="order-received-card">
      {statusIndicator()}
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
  }).isRequired,
};

export default OrderReceivedCard;
