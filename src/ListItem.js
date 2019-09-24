import React from "react";
import axios from "axios";
import {Route} from "react-router-dom";

class ListItem extends React.Component {

    render() {
        return (
            <Route render={({history}) => (
                <button onClick={this.submitCreateItem(history)}>list item</button>
            )} />
        );
    }

    submitCreateItem(history) {
        return event => {
            event.preventDefault();
            axios.post(
                this.props.baseUrl + '/items/createItem',
                {foo: "bar"},
                {withCredentials: true})
                .then((response) => {
                    console.log(response.status)
                })
                .catch((error) => {
                    history.push('/login');
                })
        };
    }
}

export default ListItem