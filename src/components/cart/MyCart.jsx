import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../shared/TitleBar';
import OwnerSection from './OwnerSection';
import './MyCart.scss';
import { refreshCart } from '../../redux/cart/cartAction';

const MyCart = () => {
  const ownerItemBatch = useSelector((state) => state.cart.cart.ownerBatches);
  const subtotal = useSelector((state) => {
    const selectedBatch = state.cart.cart.ownerBatches.find((batch) => batch.selected);
    if (selectedBatch) {
      return selectedBatch.items
        .filter((item) => item.selected)
        .reduce((aggregate, item) => aggregate + item.rentalDailyPrice * item.quantity, 0);
    }
    return 0;
  });

  const displaySubtotal = useSelector((state) => state.cart.cart.ownerBatches.some((batch) => batch.selected));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshCart());
  }, []);

  const buildOwnerSections = () => {
    const sections = [];
    ownerItemBatch.forEach((ownerBatch) => {
      sections.push(
        <OwnerSection key={ownerBatch.owner.email} owner={ownerBatch.owner} items={ownerBatch.items} />,
      );
    });

    return sections;
  };

  return (
    <div className="my-cart">
      <TitleBar />
      My Cart
      {buildOwnerSections()}
      {displaySubtotal ? (
        <div className="footer">
          Subtotal:
          $
          {subtotal}
          {' '}
          /day
        </div>
      ) : null}

    </div>
  );
};

export default MyCart;
