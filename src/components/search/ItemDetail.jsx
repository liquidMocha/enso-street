import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ItemDetail.scss';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faLuggageCart, faTruckPickup } from '@fortawesome/free-solid-svg-icons';
import TwoLineDollarDisplay from './TwoLineDollarDisplay';
import TitleBar from '../shared/TitleBar';
import { getItem } from '../../redux/item/itemAction';
import { addToCart } from '../../redux/cart/cartAction';
import ColoredButton from '../shared/ColoredButton';

const ItemDetail = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.currentLocation);
  const distance = useSelector((state) => state.item.distance) || 0.0;

  useEffect(() => {
    dispatch(getItem(itemId, coordinates));
  }, []);

  const currentItem = useSelector((state) => state.item.currentItem);

  const onClickingAddToCart = (itemToAdd) => {
    dispatch(addToCart(itemToAdd));
    toast.success('Added to cart');
  };

  return (
    <div id="item-detail-page">
      <TitleBar />
      {currentItem ? (
        <>
          <figure>
            <img src={currentItem.imageUrl} alt={currentItem.title} />
          </figure>
          <section className="item-detail__detail-top">
            <h1>{currentItem.title}</h1>
            <div>
              <h3>
                (
                {currentItem.condition}
                )
              </h3>
            </div>
            <section className="item-detail__price-section">
              <TwoLineDollarDisplay
                amount={currentItem.deposit}
                label="Deposit"
              />
              <TwoLineDollarDisplay
                amount={currentItem.rentalDailyPrice}
                label="Per day"
              />
            </section>
          </section>
          <section className="item-detail__detail-bottom">
            <section>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {distance.toFixed(1)}
              {' '}
              miles
            </section>
            {currentItem.canBeDelivered
              ? (
                <section className="item-detail__delivery-price">
                  <FontAwesomeIcon icon={faLuggageCart} />
                  Can be delivered: $
                  {(currentItem.deliveryStarting).toFixed(0)}
                  {' '}
                  (3 miles) + $
                  {(currentItem.deliveryAdditional).toFixed(0)}
                  /mile
                </section>
              )
              : (
                <section>
                  <FontAwesomeIcon icon={faTruckPickup} />
                  {' '}
                  Pickup Only
                </section>
              )}
            <div>
              <h5>Description</h5>
              <p>{currentItem.description}</p>
            </div>
          </section>
          <footer>
            <ColoredButton
              buttonText="Add to cart"
              mode="dark"
              onClick={() => onClickingAddToCart(itemId)}
            />
          </footer>
        </>
      ) : <div>Fetching</div>}

    </div>
  );
};

export default ItemDetail;
