import React from 'react';
import './styles/App.css';
import SearchBar from "./SearchBar/SearchBar";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: 'login-page'};

        this.goToSignUpPage = this.goToSignUpPage.bind(this);
    }

    goToSignUpPage() {
        this.setState({currentPage: 'signup-page'})
    }

    render() {
        return (
            <div className="App">
                <SearchBar/>
                {this.state.currentPage === 'login-page' ?
                    <LoginPage onSignUpClicked={this.goToSignUpPage}/> :
                    <SignUpPage/>}
            </div>
        );
    }

}

export default App;
