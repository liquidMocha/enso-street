import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import {Link} from "react-router-dom";

const PriceAndDelivery = () => {
    return (
        <div>
            <PostItemTitleBar/>
            <div>
                <label>Daily rental</label>
                <span>$</span><input type='number'/>
            </div>
            <div>
                <label>Deposit</label>
                <span>$</span><input type='number'/>
            </div>
            <div>
                <label>Item size</label>
                <select>
                    Please select a condition
                    <option value='small'>Small(can fit in a backpack)</option>
                    <option value='Medium'>Medium(can fit in the trunk of a sedan)</option>
                    <option value='Large'>Large(need bigger vehicle to transport)</option>
                </select>
            </div>
            <div>
                <label>Zip code</label>
                <input type='number'/>
            </div>
            <div>
                <label>This item can be delivered</label>
                <input type='radio'/>
            </div>
            <div>
                <div>
                    <label>Small</label>
                    <input type='number'/>
                </div>
                <div>
                    <label>Medium</label>
                    <input type='number'/>
                </div>
                <div>
                    <label>Large</label>
                    <input type='number'/>
                </div>
            </div>
            <Link to='/post-item/preview'>
                <button id='preview-button' className='home-page-button'>
                    Preview
                </button>
            </Link>
        </div>
    )
};

export default PriceAndDelivery