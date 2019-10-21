import {shallow} from "enzyme";
import React from "react";
import SelectableLocationRow from "../SelectableLocationRow";

describe('input with error', () => {
    let selectableLocationRow;

    beforeEach(() => {
        selectableLocationRow = shallow(
            <SelectableLocationRow name='location name' />)
    });

    it('should display location name', () => {
        const nameField =
            selectableLocationRow.find('div[date-test="location-name"]');

        expect(nameField.text()).toEqual('location name');
    });

    it('should have selected background when selected', () => {
        selectableLocationRow.setProps({selected: true});

        expect(selectableLocationRow.find('.highlight-background').length).toBe(1);
    });

    it('should not have selected background when not selected', () => {
        selectableLocationRow.setProps({selected: false});

        expect(selectableLocationRow.find('.highlight-background').length).toBe(0);
    });

    it('should invoke callback when clicked on', () => {
        const mockOnClick = jest.fn();
        selectableLocationRow.setProps({onClick: mockOnClick});

        selectableLocationRow.find('div[date-test="location-row"]').simulate('click');
        expect(mockOnClick).toHaveBeenCalled();
    })
});