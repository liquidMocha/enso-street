import React from 'react';
import './styles/App.css';
import SearchBar from "./SearchBar";
import LoginPage from "./LoginPage";

function App() {
    return (
        <div className="App">
            <SearchBar/>
            <LoginPage/>
        </div>
    );
}

export default App;
