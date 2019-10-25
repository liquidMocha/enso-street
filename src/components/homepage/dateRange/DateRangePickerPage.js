import React, {useState} from "react";
import DateTab from "./DateTab";
import '../../../styles/Modal.scss';
import {withRouter} from "react-router-dom";
import {changeRentDate, changeReturnDate} from '../../../redux/actions';
import {connect} from "react-redux";

const DateRangePickerPage = withRouter((props) => {
    const [dateSelection, toggleDateSelection] = useState('rental');

    return (
        <div>
            <div id='date-range-picker-title-bar'
                 className='fixed-title-bar'>
                <span/>
                <span className='fixed-title-bar__title--font'>
                    Select Dates
                </span>
                <span id='date-range-picker-close'
                      className='fixed-title-bar__right-element'
                      onClick={() => {
                          props.history.push('/');
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
                if (dateSelection === 'rental') {
                    props.changeRentDate(new Date(event.target.value));
                } else {
                    props.changeReturnDate(new Date(event.target.value));
                }
            }
            }/>
        </div>
    )
});

const mapStateToProps = (state) => {
    return {
        rentDate: state.searchCriteria.dates.rentDate,
        returnDate: state.searchCriteria.dates.returnDate
    }
};

export default connect(mapStateToProps, {
    changeRentDate,
    changeReturnDate
})(DateRangePickerPage)