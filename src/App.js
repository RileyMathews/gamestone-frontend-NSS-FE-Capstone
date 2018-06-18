import React, { Component } from 'react';
import NavBar from './nav/NavBar'
import './App.css';
import PlatformManager from './methods/PlatformManager';
import ViewManager from './methods/ViewManager';
import UserManager from './methods/UserManager';
import GameManager from './methods/GameManager';

/* 
    module to handle top level data management and view displaying of the app
    authors Riley Mathews
*/
class App extends Component {
    // define initial state of application
    state = {
        // information to drive view and functionality of app
        currentView: "profile",
        activeUser: sessionStorage.getItem("userId"),
        userId: null,
        userFirstName: "",
        userLastName: "",
        userGamertag: "",
        userGamesIds: [],
        userGamesStats: [],
        userGames: [],
        userPlatforms: [],
        userPlatformsIds: [],
        allPlatforms: [],
        userUnownedPlatforms: []
    }

    /* 
        View manager functions
    */
    setView = ViewManager.setView.bind(this)
    showView = ViewManager.showView.bind(this)

    /* 
        user manager functions
    */
    getUserInformation = UserManager.getUserInformation.bind(this)
    setActiveUser = UserManager.setActiveUser.bind(this)

    /* 
        platform manager functions
    */
    getPlatforms = PlatformManager.getPlatforms.bind(this)
    addPlatform = PlatformManager.addPlatform.bind(this)
    removePlatform = PlatformManager.removePlatform.bind(this)

    /* 
        game manager functions
    */
    changeGameProgress = GameManager.changeGameProgress.bind(this)
    addGameToCollection = GameManager.addGameToCollection.bind(this)
    removeGameFromCollection = GameManager.removeGameFromCollection.bind(this)
    toggleGameFavorite = GameManager.toggleGameFavorite.bind(this)

    componentDidMount() {
        // get the users information if they are logged in already on page load
        if (this.state.activeUser !== null) {
            this.getUserInformation()
        }
        // get platforms information
        this.getPlatforms()
    }


    render() {
        return (
            <div>
                <NavBar setView={this.setView}
                    setSearchType={this.setSearchType}
                    setSearchValue={this.setSearchValue}
                    searchDisplay={this.state.searchDisplay}
                    deleteActiveUser={this.deleteActiveUser}
                    activeUser={this.state.activeUser}
                    setActiveUser={this.setActiveUser}
                    gamertag={this.state.userGamertag}
                />
                {this.showView()}
            </div>
        )
    }
}

export default App;