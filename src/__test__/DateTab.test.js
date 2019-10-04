import {shallow} from "enzyme";
import React from "react";
import DateTab from "../DateTab";

describe('DateTab', () => {
    let dateTab, title, date, callback;

    beforeEach(() => {
        title = 'some title';
        date = new Date(2019, 0, 1);
        callback = jest.fn();
        dateTab = shallow(<DateTab title={title} date={date} onClick={callback}/>)
    });

    it('should display title', () => {
        const actualTitle = dateTab.find('.date-tab-title').text();
        expect(actualTitle).toBe(title);
    });

    it('should display date', () => {
        const actualMonth = dateTab.find('.date-tab-month').text();
        const actualDayOfMonth = dateTab.find('.date-tab-day-of-month').text();
        const actualDaoOfWeek = dateTab.find('.date-tab-day-of-week').text();

        expect(actualMonth).toBe('January');
        expect(actualDayOfMonth).toBe('1');
        expect(actualDaoOfWeek).toBe('Tuesday');
    });

    it('should trigger callback when clicked', () => {
        dateTab.simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    it('should handle null fields', () => {
        dateTab = shallow(<DateTab/>);

        const actualTitle = dateTab.find('.date-tab-title').text();
        const actualMonth = dateTab.find('.date-tab-month').text();
        const actualDayOfMonth = dateTab.find('.date-tab-day-of-month').text();
        const actualDaoOfWeek = dateTab.find('.date-tab-day-of-week').text();

        expect(actualMonth).toBe('');
        expect(actualDayOfMonth).toBe('');
        expect(actualDaoOfWeek).toBe('');
        expect(actualTitle).toBe('');
    });

    it('should have different style when selected', () => {
        dateTab.setProps({selected: true});
        expect(dateTab.find('.date-tab-selected').length).toEqual(1);

        dateTab.setProps({selected: false});
        expect(dateTab.find('.date-tab-selected').length).toEqual(0);
    })
});