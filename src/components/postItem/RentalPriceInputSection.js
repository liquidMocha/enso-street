import React from "react";
import DollarInput from "../shared/DollarInput";
import {useDispatch, useSelector} from "react-redux";
import {updatePostedItemDailyPrice, updatePostedItemDeposit} from "../../redux/postItemActions";

const RentalPriceInputSection = () => {
    const dispatch = useDispatch();

    const dailyPrice = useSelector(state => state.postedItem.rentalDailyPrice);
    const deposit = useSelector(state => state.postedItem.deposit);

    const handleDailyRentalChange = (event) => {
        dispatch(updatePostedItemDailyPrice(event.target.value));
    };

    const handleDepositChange = (event) => {
        dispatch(updatePostedItemDeposit(event.target.value));
    };

    return (
        <div id="price-section" className="horizontal-layout">
            <div>
                <label>Daily rental</label>
                <DollarInput
                    value={dailyPrice}
                    onChange={handleDailyRentalChange}
                />
            </div>
            <div>
                <label>Deposit</label>
                <DollarInput
                    value={deposit}
                    onChange={handleDepositChange}
                />
            </div>
        </div>
    )
};

export default RentalPriceInputSection