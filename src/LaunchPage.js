import React from 'react';
import './styles/LaunchPage.scss';
import Button from "./Button";

class LaunchPage extends React.Component {
     onSignIn = (googleUser) => {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    render() {
        return (
            <div className="launch-page">
                <div id="enso-street-title">
                    <p>Enso</p>
                    <p>Street</p>
                </div>
                <Button data-onsuccess={this.onSignIn} class="g-signin2">Sign In Through Google</Button>
                <div>
                    Conscious Living
                </div>
                <div>
                    Effortless Sharing
                </div>
            </div>
        );
    }
}

export default LaunchPage;