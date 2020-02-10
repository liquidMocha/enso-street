import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import DollarInput from '../../shared/DollarInput';
import './MyItemCard.scss';

const MyItemCard = ({
  item, onCardClick, onChangeRentalDailyPrice, onChangeSearchability, onDelete, onSave,
}) => (
  <div
    key={item.id}
    className="my-item-card"
    onClick={() => {
      onCardClick(item);
    }}
  >
    <div className="column-layout my-item-card-content">
      <h1 className="my-item-card-title">{item.title}</h1>
      <div className="row-layout my-item-card-content-data">
        <div className="my-item-image-container">
          <img src={item.imageUrl} alt="item" />
        </div>
        <div className="column-layout my-item-card-second-column">
          <div className="my-item-card-rental-price">
            <DollarInput
              value={item.rentalDailyPrice}
              onClick={(event) => {
                event.stopPropagation();
              }}
              onChange={(event) => {
                onChangeRentalDailyPrice(event, item.id);
              }}
            />
            <h5>per day</h5>
          </div>
          <span className="my-item-card-show-on-site" onClick={((event) => event.stopPropagation())}>
            <input
              type="checkbox"
              checked={item.searchable || false}
              onChange={(() => {
                onChangeSearchability(item.id);
              })}
            />
            Show on site
          </span>
        </div>
      </div>
    </div>
    <div className="my-item-card-buttons column-layout">
      <FontAwesomeIcon
        icon={faTrashAlt}
        onClick={(event) => {
          event.stopPropagation();
          onDelete(item.id);
        }}
      />
      <FontAwesomeIcon
        icon={faSave}
        onClick={(event) => {
          event.stopPropagation();
          onSave(item);
        }}
      />
    </div>
  </div>
);

MyItemCard.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    rentalDailyPrice: PropTypes.string,
    searchable: PropTypes.string,
  }).isRequired,
  onChangeRentalDailyPrice: PropTypes.func.isRequired,
  onChangeSearchability: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default MyItemCard;
