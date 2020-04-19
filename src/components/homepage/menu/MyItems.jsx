import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import '../../../styles/Spacing.scss';
import './MyItem.scss';
import '../../../styles/Input.scss';
import { toast } from 'react-toastify';
import _ from 'lodash';
import MyItemCard from './MyItemCard';
import MyItemCardSkeleton from './MyItemCardSkeleton';
import { deleteItem, getAllItemsForUser, updateItem } from '../../../services/ItemService';
import InputWithIcon from '../../shared/InputWithIcon';
import TitleBar from '../../shared/TitleBar';

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
  toast.success('Item save successful!');
  updateItem(item).then(() => {
    console.log('updated');
  });
};

const filterItemBySearchTerm = (items, searchTerm) => items.filter((item) => item.title.toLowerCase().includes(searchTerm)
            || (item.description && item.description.toLowerCase().includes(searchTerm))
            || (item.location
                && (
                  (item.location.street && item.location.street.toLowerCase().includes(searchTerm))
                    || (item.location.zipCode && item.location.zipCode.toLowerCase().includes(searchTerm))
                    || (item.location.city && item.location.city.toLowerCase().includes(searchTerm))
                    || (item.location.state && item.location.state.toLowerCase().includes(searchTerm))
                    || (item.location.nickname && item.location.nickname.toLowerCase().includes(searchTerm))
                )));

const FETCH_MY_ITEMS = 'FETCH_MY_ITEMS';
const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
const CLICK_ITEM_DELETE = 'CLICK_ITEM_DELETE';
const CONFIRM_ITEM_DELETE = 'CONFIRM_ITEM_DELETE';
const CANCEL_ITEM_DELETE = 'CANCEL_ITEM_DELETE';
const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';
const CHANGE_RENTAL_DAILY_PRICE = 'CHANGE_RENTAL_DAILY_PRICE';
const CHANGE_SEARCHABILITY = 'CHANGE_SEARCHABILITY';

const myItemsReducer = (state, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case FETCH_MY_ITEMS: {
      return {
        ...newState,
        items: action.payload,
        visibleItems: action.payload,
        loading: false,
      };
    }
    case CHANGE_SEARCH_TERM: {
      const searchTerm = action.payload;
      if (searchTerm.length !== 0) {
        return {
          ...newState,
          visibleItems: filterItemBySearchTerm(state.items, searchTerm),
          searchTerm,
        };
      }
      return {
        ...newState,
        searchTerm,
      };
    }
    case CLICK_ITEM_DELETE: {
      return {
        ...newState,
        deleteModalStatus: {
          isOpen: true,
          itemId: action.payload,
        },
      };
    }
    case CONFIRM_ITEM_DELETE: {
      return {
        ...newState,
        items: state.items.filter((existingItem) => existingItem.id !== state.deleteModalStatus.itemId),
        visibleItems: state.visibleItems.filter((existingItem) => existingItem.id !== state.deleteModalStatus.itemId),
        deleteModalStatus: {
          isOpen: false,
          itemId: '',
        },
      };
    }
    case CANCEL_ITEM_DELETE: {
      return {
        ...newState,
        deleteModalStatus: {
          isOpen: false,
          itemId: '',
        },
      };
    }
    case START_LOADING: {
      return {
        ...newState,
        loading: true,
      };
    }
    case END_LOADING: {
      return {
        ...newState,
        loading: false,
      };
    }
    case CHANGE_RENTAL_DAILY_PRICE: {
      const newPrice = action.payload.price;
      const { itemId } = action.payload;

      const newItems = newState.items;
      const newItem = newItems.find((updatedItem) => updatedItem.id === itemId);
      newItem.rentalDailyPrice = newPrice;
      return {
        ...newState,
        items: newItems,
      };
    }
    case CHANGE_SEARCHABILITY: {
      const itemId = action.payload;
      const newItems = newState.items;
      const newItem = newItems.find((updatedItem) => updatedItem.id === itemId);
      newItem.searchable = !newItem.searchable;
      return {
        ...newState,
        items: newItems,
      };
    }
    default:
      return state;
  }
};

const MyItems = (props) => {
  const history = useHistory();

  const [state, dispatch] = useReducer(myItemsReducer, {
    items: [],
    visibleItems: [],
    searchTerm: '',
    loading: false,
    deleteModalStatus: {
      isOpen: false,
      itemId: '',
    },
  });

  useEffect(() => {
    dispatch({ type: START_LOADING });
    getAllItemsForUser()
      .then((items) => {
        const sortedItems = items.sort(byCreatedOn);
        dispatch({ type: END_LOADING });
        dispatch({ type: FETCH_MY_ITEMS, payload: sortedItems });
      });
  }, []);

  const deleteItemById = async (itemId) => {
    await deleteItem(itemId);
    dispatch({ type: CONFIRM_ITEM_DELETE });
  };

  const onItemDelete = (itemId) => {
    dispatch({ type: CLICK_ITEM_DELETE, payload: itemId });
  };

  const onChangeRentalDailyPrice = (event, itemId) => {
    dispatch({ type: CHANGE_RENTAL_DAILY_PRICE, payload: { price: event.target.value, itemId } });
  };

  const onChangeSearchability = (itemId) => {
    dispatch({ type: CHANGE_SEARCHABILITY, payload: itemId });
  };

  return (
    <div>
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
            onChange={((event) => {
              dispatch({ type: CHANGE_SEARCH_TERM, payload: event.target.value.toLocaleLowerCase() });
            })}
          />
        </InputWithIcon>
      </section>
      {state.loading
        ? (
          <>
            <MyItemCardSkeleton />
            <MyItemCardSkeleton />
            <MyItemCardSkeleton />
          </>
        )
        : state.visibleItems.map((item) => (
          <MyItemCard
            key={item.id}
            item={item}
            onDelete={onItemDelete}
            onSave={onItemSave}
            onChangeRentalDailyPrice={onChangeRentalDailyPrice}
            onChangeSearchability={onChangeSearchability}
            onCardClick={props.onClickItemCard}
          />
        ))}
      <Modal
        isOpen={state.deleteModalStatus.isOpen}
        className="delete-item-modal"
        overlayClassName="delete-item-modal-overlay"
      >
        <div>Are you sure you want to delete this item?</div>
        <div className="modal-button-group">
          <div onClick={() => {
            deleteItemById(state.deleteModalStatus.itemId);
          }}
          >
            Delete
          </div>
          <div onClick={() => {
            dispatch({ type: CANCEL_ITEM_DELETE });
          }}
          >
            Cancel
          </div>
        </div>
      </Modal>
    </div>
  );
};

MyItems.propTypes = {
  onClickItemCard: PropTypes.func.isRequired,
};

export default MyItems;
