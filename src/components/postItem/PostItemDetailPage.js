import React from "react";
import PostItemTitleBar from "../shared/PostItemTitleBar";
import NextButton from "./NextButton";

const PostItemDetailPage = () => {
    return (
        <div>
            <PostItemTitleBar/>
            <div>
                <label>Condition</label>
                <select>
                    <option value="like-new">Like new</option>
                    <option value="normal-wear">Normal wear</option>
                    <option value="functional">Functional</option>
                </select>
            </div>
            <div>
                <label>Description(optional)</label>
                <input type='textarea'/>
            </div>
            <NextButton destination='/post-item/price-and-delivery'/>
        </div>
    )
};

export default PostItemDetailPage