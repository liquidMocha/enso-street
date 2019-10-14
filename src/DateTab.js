import React from "react";
import './styles/DateTab.scss';
import './styles/font.scss';

const DateTab = (prop) => {
    const monthFormatter = new Intl.DateTimeFormat('en-US', {month: 'long'});
    const weekdayFormatter = new Intl.DateTimeFormat('en-US', {weekday: 'long'});
    let monthName = '';
    let dayOfMonth = '';
    let dayOfWeek = '';

    if (prop.date) {
        const dateToDisplay = prop.date;
        monthName = monthFormatter.format(dateToDisplay);
        dayOfMonth = dateToDisplay.getDate();
        dayOfWeek = weekdayFormatter.format(dateToDisplay);
    }

    return (
        <div id={prop.id}
             className={`date-tab ${prop.selected ? 'date-tab-selected' : ''}`}
             onClick={prop.onClick}>
            <div>
                <div className='date-tab-title deemphasize'>{prop.title}</div>
                <div className='date-tab-month bold'>{monthName}</div>
                <div className='date-tab-day-of-week'>{dayOfWeek}</div>
            </div>
            <div>
                <div className='date-tab-day-of-month'>{dayOfMonth}</div>
            </div>
        </div>
    )
};

export default DateTab;