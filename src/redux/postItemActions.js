import {
    UPDATE_POSTED_ITEM_CAN_BE_DELIVERED,
    UPDATE_POSTED_ITEM_CATEGORIES,
    UPDATE_POSTED_ITEM_CONDITION,
    UPDATE_POSTED_ITEM_DAILY_PRICE,
    UPDATE_POSTED_ITEM_DEPOSIT,
    UPDATE_POSTED_ITEM_DESCRIPTION,
    UPDATE_POSTED_ITEM_IMAGE_URL,
    UPDATE_POSTED_ITEM_TITLE
} from "./actionTypes";

export const updatePostedItemTitle = title => ({
    type: UPDATE_POSTED_ITEM_TITLE,
    payload: title
});

export const updatePostedItemImageUrl = url => ({
    type: UPDATE_POSTED_ITEM_IMAGE_URL,
    payload: url
});

export const updatePostedItemDailyPrice = price => ({
    type: UPDATE_POSTED_ITEM_DAILY_PRICE,
    payload: price
});

export const updatePostedItemDeposit = deposit => ({
    type: UPDATE_POSTED_ITEM_DEPOSIT,
    payload: deposit
});


export const updatePostedItemCategories = categories => ({
    type: UPDATE_POSTED_ITEM_CATEGORIES,
    payload: categories
});

export const updatePostedItemCondition = condition => ({
    type: UPDATE_POSTED_ITEM_CONDITION,
    payload: condition
});


export const updatePostedItemDescription = description => ({
    type: UPDATE_POSTED_ITEM_DESCRIPTION,
    payload: description
});


export const updatePostedItemCanBeDelivered = canBeDelivered => ({
    type: UPDATE_POSTED_ITEM_CAN_BE_DELIVERED,
    payload: canBeDelivered
});