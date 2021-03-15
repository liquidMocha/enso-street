import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Item.scss';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import TitleBar from '../../shared/TitleBar';
import { getItem } from '../../../redux/item/itemAction';
import { addToCart } from '../../../redux/cart/cartAction';
import ColoredButton from '../../shared/ColoredButton';
import ItemSummary from './ItemSummary';
import ItemDetails from './ItemDetails';

const Item = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.currentLocation);
  const distance = useSelector((state) => state.item.distance) || 0.0;
  const currentItem = useSelector((state) => state.item.currentItem);

  useEffect(() => {
    dispatch(getItem(itemId, coordinates));
  }, [itemId]);

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
          <ItemSummary item={currentItem} />
          <ItemDetails item={currentItem} distance={distance} />
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

export default Item;
