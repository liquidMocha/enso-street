import React from 'react';

class Button extends React.Component {

    render() {
        return (
            <div onClick={this.props.onclick}>
                {this.props.children}
            </div>
        )
    }
}

export default Button;