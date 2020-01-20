import PropTypes from 'prop-types';
import React, {useEffect, useReducer} from "react";
import {deleteItem, getAllItemsForUser, updateItem} from "../../../services/ItemService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import Modal from 'react-modal';
import "../../../styles/Spacing.scss";
import "../../../styles/MyItem.scss";
import "../../../styles/Input.scss";
import {toast} from "react-toastify";
import MyItemCard from "./MyItemCard";
import MyItemCardSkeleton from "./MyItemCardSkeleton";
import _ from "lodash";

const byCreatedOn = (a, b) => {
    const timeA = a.createdOn;
    const timeB = b.createdOn;
    if (timeA > timeB) {
        return -1;
    } else if (timeA < timeB) {
        return 1;
    }
    return 0;
};

const onItemSave = (item) => {
    toast.success('Item save successful!');
    updateItem({
        id: item.id,
        rentalDailyPrice: item.rentalDailyPrice,
        searchable: item.searchable
    }).then(() => {
        console.log('updated')
    });
};

const filterItemBySearchTerm = (items, searchTerm) => {
    return items.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.location &&
                (
                    (item.location.street && item.location.street.toLowerCase().includes(searchTerm)) ||
                    (item.location.zipCode && item.location.zipCode.toLowerCase().includes(searchTerm)) ||
                    (item.location.city && item.location.city.toLowerCase().includes(searchTerm)) ||
                    (item.location.state && item.location.state.toLowerCase().includes(searchTerm)) ||
                    (item.location.nickname && item.location.nickname.toLowerCase().includes(searchTerm))
                ));
    })
};

const FETCH_MY_ITEMS = 'FETCH_MY_ITEMS';
const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
const CLICK_ITEM_DELETE = 'CLICK_ITEM_DELETE';
const CONFIRM_ITEM_DELETE = 'CONFIRM_ITEM_DELETE';
const CANCEL_ITEM_DELETE = 'CANCEL_ITEM_DELETE';
const START_LOADING = 'START_LOADING';
const END_LOADING = 'END_LOADING';
const CHANGE_RENTAL_DAILY_PRICE = 'CHANGE_RENTAL_DAILY_PRICE';
const CHANGE_SEARCHABILITY = 'CHANGE_SEARCHABILITY';

const MyItems = (props) => {
    let history = useHistory();

    const myItemsReducer = (state, action) => {
        const newState = _.cloneDeep(state);

        switch (action.type) {
            case FETCH_MY_ITEMS: {
                return {
                    ...newState,
                    items: action.payload,
                    visibleItems: action.payload,
                    loading: false,
                }
            }
            case CHANGE_SEARCH_TERM: {
                const searchTerm = action.payload;
                if (searchTerm.length !== 0) {
                    return {
                        ...newState,
                        visibleItems: filterItemBySearchTerm(state.items, searchTerm),
                        searchTerm: searchTerm,
                    };
                } else {
                    return {
                        ...newState,
                        searchTerm: searchTerm,
                    };
                }
            }
            case CLICK_ITEM_DELETE: {
                return {
                    ...newState,
                    deleteModalStatus: {
                        isOpen: true,
                        itemId: action.payload
                    }
                }
            }
            case CONFIRM_ITEM_DELETE: {
                return {
                    ...newState,
                    items: state.items.filter(existingItem => {
                        return existingItem.id !== state.deleteModalStatus.itemId
                    }),
                    visibleItems: state.visibleItems.filter(existingItem => {
                        return existingItem.id !== state.deleteModalStatus.itemId
                    }),
                    deleteModalStatus: {
                        isOpen: false,
                        itemId: ''
                    }
                };
            }
            case CANCEL_ITEM_DELETE: {
                return {
                    ...newState,
                    deleteModalStatus: {
                        isOpen: false,
                        itemId: ''
                    }
                };
            }
            case START_LOADING: {
                return {
                    ...newState,
                    loading: true,
                }
            }
            case END_LOADING: {
                return {
                    ...newState,
                    loading: false,
                }
            }
            case CHANGE_RENTAL_DAILY_PRICE: {
                const newPrice = action.payload.price;
                const itemId = action.payload.itemId;

                let newItems = newState.items;
                let newItem = newItems.find(updatedItem => {
                    return updatedItem.id === itemId;
                });
                newItem.rentalDailyPrice = newPrice;
                return {
                    ...newState,
                    items: newItems,
                }
            }
            case CHANGE_SEARCHABILITY: {
                const itemId = action.payload;
                let newItems = newState.items;
                let newItem = newItems.find(updatedItem => {
                    return updatedItem.id === itemId;
                });
                newItem.searchable = !newItem.searchable;
                return {
                    ...newState,
                    items: newItems,
                }
            }
            default:
                throw new Error('Unexpected action in MyItems.');
        }
    };

    const [state, dispatch] = useReducer(myItemsReducer, {
        items: [],
        visibleItems: [],
        searchTerm: '',
        loading: false,
        deleteModalStatus: {
            isOpen: false,
            itemId: ''
        }
    });

    useEffect(() => {
        dispatch({type: START_LOADING});
        getAllItemsForUser()
            .then(items => {
                let sortedItems = items.sort(byCreatedOn);
                dispatch({type: END_LOADING});
                dispatch({type: FETCH_MY_ITEMS, payload: sortedItems});
            });
    }, []);

    const deleteItemById = async (itemId) => {
        await deleteItem(itemId);
        dispatch({type: CONFIRM_ITEM_DELETE});
    };

    const onItemDelete = (itemId) => {
        dispatch({type: CLICK_ITEM_DELETE, payload: itemId});
    };

    const onChangeRentalDailyPrice = (event, itemId) => {
        dispatch({type: CHANGE_RENTAL_DAILY_PRICE, payload: {price: event.target.value, itemId}});
    };

    const onChangeSearchability = (itemId) => {
        dispatch({type: CHANGE_SEARCHABILITY, payload: itemId});
    };

    return (
        <div>
            <div className='fixed-title-bar'>
                <span onClick={() => {
                    history.push('/menu')
                }}>
                    <FontAwesomeIcon icon={faAngleLeft}/> Back
                </span>
                <span className='fixed-title-bar__title--font'>My Items</span>
                <span onClick={() => {
                    history.push('/post-item')
                }}><FontAwesomeIcon icon={faPlus}/>Add</span>
            </div>
            <div id='my-items-search'>
                <input type='text'
                       className='input-field'
                       placeholder='Search my item'
                       onChange={(event => {
                           dispatch({type: CHANGE_SEARCH_TERM, payload: event.target.value.toLocaleLowerCase()});
                       })}
                />
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            {state.loading ?
                <>
                    <MyItemCardSkeleton/>
                    <MyItemCardSkeleton/>
                    <MyItemCardSkeleton/>
                </> :
                state.visibleItems.map(item => {
                    return (<MyItemCard key={item.id}
                                        item={item}
                                        onDelete={onItemDelete}
                                        onSave={onItemSave}
                                        onChangeRentalDailyPrice={onChangeRentalDailyPrice}
                                        onChangeSearchability={onChangeSearchability}
                                        onCardClick={props.onClickItemCard}
                        />
                    )
                })}
            <Modal isOpen={state.deleteModalStatus.isOpen}
                   className='delete-item-modal'
                   overlayClassName="delete-item-modal-overlay">
                <div>Are you sure you want to delete this item?</div>
                <div className='modal-button-group'>
                    <div onClick={() => {
                        deleteItemById(state.deleteModalStatus.itemId);
                    }}>Delete
                    </div>
                    <div onClick={() => {
                        dispatch({type: CANCEL_ITEM_DELETE});
                    }}>Cancel
                    </div>
                </div>
            </Modal>
        </div>
    )
};

MyItems.propTypes = {
    onClickItemCard: PropTypes.func
};

export default MyItems