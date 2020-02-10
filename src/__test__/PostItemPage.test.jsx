import { shallow } from 'enzyme';
import React from 'react';
import PostItemPage from '../components/postItem/PostItemPage';

describe('post item title page', () => {
  it('should dispatch action when title is changed', () => {
    const mockOnTitleChange = jest.fn();

    const postItemPage = shallow(<PostItemPage
      onTitleChange={mockOnTitleChange}
      item={{ title: '' }}
      onLocalImageLoad={jest.fn()}
      useMyPhotoPath=""
    />);

    postItemPage.find('#item-title-input').simulate('change', 'item title');
    expect(mockOnTitleChange).toHaveBeenCalledWith('item title');
  });

  it('should display existing title in input', () => {
    const existingTitle = 'electric drill';

    const postItemPage = shallow(<PostItemPage
      item={{ title: existingTitle }}
      onLocalImageLoad={jest.fn()}
      useMyPhotoPath=""
      onTitleChange={jest.fn()}
    />);

    expect(postItemPage.find('#item-title-input').prop('value')).toEqual(existingTitle);
  });
});
