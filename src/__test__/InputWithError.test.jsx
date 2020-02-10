import { shallow } from 'enzyme';
import React from 'react';
import InputWithError from '../components/shared/InputWithError';

describe('input with error', () => {
  let inputWithError;
  let onChangeCallback;
  let shouldError;

  beforeEach(() => {
    onChangeCallback = jest.fn();
    shouldError = jest.fn();

    inputWithError = shallow(<InputWithError
      onChange={onChangeCallback}
      shouldError={shouldError}
      id="some-input-with-error"
      type="text"
      value=""
    />);
  });

  it('should invoke callback when typed in', () => {
    const inputField = inputWithError.find('input');
    const inputValue = 'someText';

    inputField.simulate('change', { target: { value: inputValue } });

    expect(onChangeCallback).toHaveBeenCalledWith(inputValue);
  });

  it('should display error message on blur on condition', () => {
    shouldError.mockReturnValue(true);
    inputWithError.find('input').simulate('blur');

    expect(inputWithError.find('ErrorMessage').length).toEqual(1);
  });

  it('should hide error message on blur on condition', () => {
    shouldError.mockReturnValueOnce(true);
    inputWithError.find('input').simulate('blur');
    shouldError.mockReturnValueOnce(false);
    inputWithError.find('input').simulate('blur');

    expect(inputWithError.find('ErrorMessage').length).toEqual(0);
  });
});
