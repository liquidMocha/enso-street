import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ItemDetail.scss';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TowLineDollarDisplay from './TowLineDollarDisplay';
import TitleBar from '../shared/TitleBar';
import { getItem } from '../../redux/item/itemAction';
import { addToCart } from '../../redux/cart/cartAction';
import ColoredButton from '../shared/ColoredButton';

const ItemDetail = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem(itemId));
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
            <section>
              <TowLineDollarDisplay
                amount={currentItem.rentalDailyPrice}
                label="Per day"
              />
              <TowLineDollarDisplay
                amount={currentItem.deposit}
                label="Deposit"
              />
            </section>
          </section>
          <section className="item-detail__detail-bottom">
            <div>
              <label>Condition</label>
              <h3>{currentItem.condition}</h3>
            </div>
            <div>
              <label>Description</label>
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
