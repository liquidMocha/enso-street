import {shallow} from "enzyme";
import InputWithError from "../InputWithError";
import React from "react";

describe('input with error', () => {
    let inputWithError,
        onChangeCallback,
        shouldError;

    beforeEach(() => {
        onChangeCallback = jest.fn();
        shouldError = jest.fn();

        inputWithError = shallow(<InputWithError
            onChange={onChangeCallback}
            shouldError={shouldError}
        />);
    });

    it('should invoke callback when typed in', () => {
        const inputField = inputWithError.find('input');
        let inputValue = 'someText';

        inputField.simulate('change', {target: {value: inputValue}});

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
    })
});