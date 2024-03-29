import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './CategoryCard.scss';
import { getItemCountForCategory } from '../../services/CategoryService';

const CategoryCard = ({
  categoryKey, imageSource, name, onClick,
}) => {
  const [count, setCount] = useState(0);
  const [countDisplay, setCountDisplay] = useState('0');

  useEffect(() => {
    async function getItemCount() {
      setCount((await getItemCountForCategory(categoryKey)) || 0);
    }

    getItemCount();
  }, []);

  useEffect(() => {
    if (count > 10) {
      setCountDisplay('10+ options');
    } else if (count > 100) {
      setCountDisplay('100+ options');
    } else if (count > 500) {
      setCountDisplay('500+ options');
    } else if (count > 1000) {
      setCountDisplay('1000+ options');
    } else {
      setCountDisplay(`${count} options`);
    }
  }, [count]);

  return (
    <figure className="category-card">
      <button onClick={onClick} type="button">
        <img src={imageSource} alt={name} />
        <figcaption className="category-card-texts">
          <div>
            <h1>{name}</h1>
            <hr />
            <h5>{countDisplay}</h5>
          </div>
        </figcaption>
      </button>
    </figure>
  );
};

CategoryCard.propTypes = {
  imageSource: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  categoryKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoryCard;
