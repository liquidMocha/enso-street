import {shallow} from "enzyme";
import PostItemPage from "../components/postItem/PostItemPage";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {updatePostedItemTitle} from "../redux/postItemActions";

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

describe('post item title page', () => {
    it('should dispatch action when title is changed', () => {
        const mockedDispatch = jest.fn();
        useDispatch.mockReturnValue(mockedDispatch);

        const postItemPage = shallow(<PostItemPage/>);

        postItemPage.find('#item-title-input').simulate('change', 'item title');
        expect(mockedDispatch).toHaveBeenCalledWith(updatePostedItemTitle('item title'));
    });

    it('should display existing title in input', () => {
        const existingTitle = "electric drill";
        useSelector.mockReturnValue(existingTitle);

        const postItemPage = shallow(<PostItemPage/>);

        expect(postItemPage.find('#item-title-input').prop('value')).toEqual(existingTitle);
    })
});