import React from "react";
import axios from "axios";

class ListItem extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.onSubmitListItem()}>list item</button>
            </div>
        );
    }

    onSubmitListItem = () => {
        const baseUrl = process.env.REACT_APP_SERVER_URL;
        axios.post(baseUrl + '/items/createItem', {foo: "bar"}, {withCredentials: true})
    };
}

export default ListItem