import React, {useState} from "react";
import DateTab from "./DateTab";
import Modal from "react-modal";

const DateRangePickerModal = (props) => {
    const [dateSelection, toggleDateSelection] = useState('rental');

    return (
        <Modal className='date-range-picker-modal'
               overlayClassName="date-range-picker-overlay"
               isOpen={props.displayDatePicker}>
            <div id='date-range-picker-title-bar'>
                <span/>
                <span id='date-range-picker-title'>Select Dates</span>
                <span id='date-range-picker-close' onClick={() => {
                    props.toggleDatePicker(false);
                }}>Done
                    </span>
            </div>
            <div id='date-tabs'>
                <DateTab id='rent-date' title='Rent'
                         onClick={() => toggleDateSelection('rental')}
                         date={props.rentDate}
                         selected={dateSelection === 'rental'}/>
                <DateTab id='return-date' title='Return'
                         onClick={() => toggleDateSelection('return')}
                         date={props.returnDate}
                         selected={dateSelection === 'return'}/>
            </div>
            {/*TODO: fix this*/}
            <label>date picker place holder</label>
            <input type='date' onBlur={(event) => {
                console.log(event.target.value);
                if (dateSelection === 'rental') {
                    props.setRentDate(new Date(event.target.value))
                } else {
                    props.setReturnDate(new Date(event.target.value))
                }
            }
            }/>
        </Modal>
    )
};

export default DateRangePickerModal