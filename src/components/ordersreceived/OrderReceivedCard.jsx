import PropTypes from 'prop-types';
import React from 'react';
import OrderLineItemIcon from './OrderLineItemIcon';
import './OrderReceivedCard.scss';

const OrderReceivedCard = ({
  status, startTime, returnTime, orderLineItems,
}) => {
  const orderReceivedActions = () => {
    if (status === 'PENDING') {
      return (
        <section className="order-received-card__action-buttons">
          <button>Confirm</button>
          <button>Cancel</button>
        </section>
      );
    } if (status === 'CONFIRMED') {
      return (
        <section className="order-received-card__action-buttons">
          <button>Edit Order</button>
          <button>Confirm Return</button>
        </section>
      );
    }
    return null;
  };

  const statusIndicator = () => {
    if (status === 'PENDING') {
      return (<span className="status-indicator--pending">Pending</span>);
    }
    if (status === 'CONFIRMED') {
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
        {orderLineItems.map((orderLineItem) => (
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
  status: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  returnTime: PropTypes.instanceOf(Date).isRequired,
  orderLineItems: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};

export default OrderReceivedCard;
