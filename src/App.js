import React, { Component } from 'react';
import NavBar from './nav/NavBar'
import ProfileView from './profile/ProfileView'
import './App.css';
import SearchView from './search/SearchView';
import LoginView from './login/LoginView';
import $ from 'jquery'
import APIManager from './api/APIManager'

class App extends Component {
    // define initial state of application
    state = {
        // information to drive view and functionality of app
        currentView: "profile",
        activeUser: sessionStorage.getItem("userId"),
        userGamesIds: [],
        userId: null,
        userFirstName: "",
        userLastName: "",
        userGamertag: "",
        userGames: []
    }

    // set view of the application state
    setView = function (e) {
        let view = null

        // Click event triggered switching view
        if (e.hasOwnProperty("target")) {
            view = e.target.id.split("__")[1]

            // View switch manually triggered by passing in string
        } else {
            view = e
        }

        // If user clicked logout in nav, empty local storage and update activeUser state
        if (view === "logout") {
            this.setActiveUser(null)
            localStorage.clear()
            sessionStorage.clear()
        }

        // Update state to correct view will be rendered
        this.setState({
            currentView: view
        })

    }.bind(this)

    componentDidMount() {
        // get the users information if they are logged in already on page load
        if (this.state.activeUser !== null) {
            this.getUserInformation()
        }
    }

    // function to get users information and udpate relevant items in state
    getUserInformation = () => {
        // fetches the users account information
        fetch(`http://localhost:8088/users?id=${this.state.activeUser}`)
            .then(r => r.json())
            .then(response => {
                const user = response[0]
                this.setState({
                    userId: user.id,
                    userFirstName: user.name.first,
                    userLastName: user.name.last,
                    userGamertag: user.gamertag
                })
            })
        // fetches the users games collection
        fetch(`http://localhost:8088/usersGames?userId=${this.state.activeUser}&_expand=game`)
            .then(r => r.json())
            .then(response => {
                const arrayOfIds = response.map(game => game.id)
                this.setState({
                    userGamesIds: arrayOfIds,
                    userGames: response
                })
            })
    }


    // function to change the progress of a game
    changeGameProgress = function (event) {
        // grab the usersGame id from the id of the event
        const gameId = event.target.id.split("__")[3]
        // hide the select field
        $(`#game__change__progress__container__${gameId}`).hide()

        // set state of corresponding game
        const oldGamesArray = this.state.userGames

        // declare variable for data that will be changed
        let dataToChange 
        
        // loop through the games array and find the game that matches the id of the event
        const newGamesArray = oldGamesArray.map(game => {
            if (parseInt(game.id, 10) === parseInt(gameId, 10)) {
                game.progress = event.target.value
                dataToChange = game
                return game
            } else {
                return game
            }
        })

        // set state of games array
        this.setState({userGames: newGamesArray})

        // remove data that was embeded in original state
        const dataToSend = {
            "id": dataToChange.id,
            "userId": dataToChange.userId,
            "gameId": dataToChange.gameId,
            "isFavorited": dataToChange.isFavorited,
            "progress": dataToChange.progress
        }

        APIManager.put("usersGames", dataToSend, gameId)
    }.bind(this) // end of change game progress function

    // function to set active user based on info passed to it
    setActiveUser = function (userId) {
        this.setState({ activeUser: userId })
    }.bind(this)


    // function to return different components based on applications view state
    showView = () => {
        if (sessionStorage.getItem("userId") === null) {
            return <LoginView setActiveUser={this.setActiveUser} setView={this.setView} getUserInformation={this.getUserInformation} />
        } else {
            switch (this.state.currentView) {
                case "search":
                    return <SearchView  activeUser={this.state.activeUser} userGamesIds={this.state.userGamesIds} changeGameProgress={this.changeGameProgress}/>
                case "profile":
                default:
                    return <ProfileView firstName={this.state.userFirstName} lastName={this.state.userLastName} gamertag={this.state.userGamertag} activeUser={this.state.activeUser} userGamesIds={this.state.userGamesIds} games={this.state.userGames} changeGameProgress={this.changeGameProgress} />
            }
        }
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
                    setActiveUser={this.setActiveUser} />
                {this.showView()}
            </div>
        )
    }
}

export default App;