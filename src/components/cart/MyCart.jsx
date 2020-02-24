import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../shared/TitleBar';
import OwnerSection from './OwnerSection';
import './MyCart.scss';
import { refreshCart } from '../../redux/cart/cartAction';

const MyCart = () => {
  const ownerItemBatch = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshCart());
  }, []);

  const buildOwnerSections = () => ownerItemBatch.map(
    (value, key) => <OwnerSection key={key.email} owner={key} items={value} />,
  );

  return (
    <div className="my-cart">
      <TitleBar />
      My Cart
      {buildOwnerSections()}
    </div>
  );
};

export default MyCart;
