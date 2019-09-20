import React from "react";
import axios from "axios";

class ListItem extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.onSubmitListItem}>list item</button>
            </div>
        );
    }

    onSubmitListItem = (event) => {
        event.preventDefault();
        axios.post(this.props.baseUrl + '/items/createItem', {foo: "bar"}, {withCredentials: true})
    };
}

export default ListItem