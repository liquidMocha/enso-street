import PropTypes from 'prop-types';
import React from 'react';
import TwoLineDollarDisplay from './TwoLineDollarDisplay';

const ItemSummary = ({ item }) => (
  <section className="item-detail__detail-top">
    <section className="item-detail__overview">
      <section>
        <h1>{item.title}</h1>
        <div>
          <h3>
            (
            {item.condition}
            )
          </h3>
        </div>
      </section>
      <section className="item-detail__price-section">
        <TwoLineDollarDisplay
          amount={item.deposit}
          label="Deposit"
        />
        <TwoLineDollarDisplay
          amount={item.rentalDailyPrice}
          label="Per day"
        />
      </section>
    </section>
    <section className="item-detail__owner-alias">
      <h3>{item.ownerAlias}</h3>
    </section>
  </section>
);

ItemSummary.propTypes = {
  item: PropTypes.shape(
    {
      title: PropTypes.string,
      condition: PropTypes.string,
      deposit: PropTypes.number,
      rentalDailyPrice: PropTypes.number,
      ownerAlias: PropTypes.string,
    },
  ).isRequired,
};

export default ItemSummary;
