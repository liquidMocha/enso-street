import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose, map, path, pipe, } from 'ramda';
import TitleBar from '../shared/TitleBar';
import OwnerSection from './OwnerSection';
import './MyCart.scss';
import { refreshCart } from '../../redux/cart/cartAction';
import { hasItemSelected, subtotal as cartSubtotal } from '../../redux/cart/Cart';

const subtotalFooter = (subtotal, history) => (
  <button
    type="button"
    className="footer"
    onClick={() => { history.push('/checkout'); }}
  >
    Subtotal:
    $
    {subtotal}
    {' '}
    /day
    <div>Check Out</div>
  </button>
);

const MyCart = () => {
  const history = useHistory();
  const ownerItemBatches = useSelector((state) => state.cart.cart.ownerBatches);
  const subtotal = useSelector(compose(cartSubtotal, path(['cart', 'cart'])));
  const displaySubtotal = useSelector(pipe(path(['cart', 'cart']), hasItemSelected));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshCart());
  }, []);

  const buildOwnerSections = () => map((ownerBatch) => (
    <OwnerSection
      key={ownerBatch.owner.email}
      owner={ownerBatch.owner}
      items={ownerBatch.items}
    />
  ), ownerItemBatches);

  return (
    <div className="my-cart">
      <TitleBar />
      My Cart
      {buildOwnerSections()}
      {displaySubtotal ? (subtotalFooter(subtotal, history)) : null}
    </div>
  );
};

export default MyCart;
