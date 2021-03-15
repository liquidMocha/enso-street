import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import '../../../../styles/Spacing.scss';
import './MyItem.scss';
import '../../../../styles/Input.scss';
import { toast } from 'react-toastify';
import {
  any,
  assoc,
  compose,
  evolve,
  filter,
  findIndex,
  isNil,
  lensIndex,
  map,
  not,
  over,
  paths,
  pipe,
  propEq,
  reject,
  toLower,
} from 'ramda';
import MyItemCard from './MyItemCard';
import MyItemCardSkeleton from './MyItemCardSkeleton';
import { deleteItem, getAllItemsForUser, updateItem } from '../../../../services/ItemService';
import InputWithIcon from '../../../shared/InputWithIcon';
import TitleBar from '../../../shared/TitleBar';
import DeleteItemModal from '../../../cart/DeleteItemModal';

const byCreatedOn = (a, b) => {
  const timeA = a.createdOn;
  const timeB = b.createdOn;
  if (timeA > timeB) {
    return -1;
  } if (timeA < timeB) {
    return 1;
  }
  return 0;
};

const onItemSave = (item) => {
  updateItem(item).then(() => {
    toast.success('Item save successful!');
  });
};

const filterItemsBy = (searchTerm) => pipe(
  paths([
    ['title'],
    ['description'],
    ['location', 'address', 'street'],
    ['location', 'address', 'zipCode'],
    ['location', 'address', 'city'],
    ['location', 'address', 'state'],
    ['location', 'address', 'nickname']]),
  filter(compose(not, isNil)),
  map(toLower),
  any((value) => value.includes(searchTerm)),
);

const filterItemBySearchTerm = (items, searchTerm) => {
  const searchTermFilter = filterItemsBy(searchTerm);
  return filter(searchTermFilter, items);
};

const MyItems = ({ onClickItemCard }) => {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const [visibleItems, setVisibleItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    itemId: '',
  });

  useEffect(() => {
    setIsLoading(true);

    getAllItemsForUser()
      .then((fetchedItems) => {
        setItems(fetchedItems.sort(byCreatedOn));
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleItems(filterItemBySearchTerm(items, searchTerm));
  }, [items, searchTerm]);

  const deleteItemById = async (itemId) => {
    await deleteItem(itemId);
    setItems(reject(propEq('id', itemId), items));
    setDeleteModalState({
      isOpen: false,
      itemId: '',
    });
  };

  const onItemDelete = (itemId) => {
    setDeleteModalState({
      isOpen: true,
      itemId,
    });
  };

  const cancelItemDelete = () => {
    setDeleteModalState({
      isOpen: false,
      itemId: '',
    });
  };

  const onChangeRentalDailyPrice = (event, itemId) => {
    const price = event.target.value;
    setItems(
      over(
        lensIndex((findIndex(propEq('id', itemId))(items))),
        assoc('rentalDailyPrice', price),
        items,
      ),
    );
  };

  const onChangeSearchability = (itemId) => {
    setItems(over(
      lensIndex((findIndex(propEq('id', itemId))(items))),
      evolve({ searchable: not }),
      items,
    ));
  };

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLocaleLowerCase());
  };

  return (
    <div className="my-items">
      <TitleBar />
      <section id="my-items-page-title">
        <h1>My Items</h1>
        <h1 onClick={() => {
          history.push('/post-item');
        }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add
        </h1>
      </section>
      <section id="my-items-search">
        <InputWithIcon>
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search my item"
            onChange={onSearchTermChange}
          />
        </InputWithIcon>
      </section>
      {isLoading
        ? (
          <>
            <MyItemCardSkeleton />
            <MyItemCardSkeleton />
            <MyItemCardSkeleton />
          </>
        )
        : visibleItems.map((item) => (
          <MyItemCard
            key={item.id}
            item={item}
            onDelete={onItemDelete}
            onSave={onItemSave}
            onChangeRentalDailyPrice={onChangeRentalDailyPrice}
            onChangeSearchability={onChangeSearchability}
            onCardClick={onClickItemCard}
          />
        ))}
      <DeleteItemModal
        onDelete={() => {
          deleteItemById(deleteModalState.itemId);
        }}
        onCancel={cancelItemDelete}
        isOpen={deleteModalState.isOpen}
      />
    </div>
  );
};

MyItems.propTypes = {
  onClickItemCard: PropTypes.func.isRequired,
};

export default MyItems;
