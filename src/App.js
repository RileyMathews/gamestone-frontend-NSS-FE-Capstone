import React, { Component } from 'react';
import NavBar from './nav/NavBar'
import ProfileView from './profile/ProfileView'
import './App.css';
import SearchView from './search/SearchView';
import LoginView from './login/LoginView';
import $ from 'jquery'
import APIManager from './api/APIManager'
import SuggestView from './suggestGame/SuggestView';
import { Title } from 'bloomer/lib/elements/Title';

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
        APIManager.getUsersGames(this.state.activeUser)
            .then(r => r.json())
            .then(response => {
                // map the giant bomb ids of each of those games into a seperate array
                const arrayOfIds = response.map(game => game.gameId)
                this.setState({
                    userGamesStats: response,
                    userGamesIds: arrayOfIds,
                })
                // use that array to build an array of fetch requests for each game
                let promises = []
                arrayOfIds.forEach(id => {
                    promises.push(APIManager.getGbGame(id))
                })

                // fire that array in a promise.all 
                Promise.all(promises)
                    .then(response => {
                        // with the response of that array, setstate of app
                        const userGamesState = response.map(response => response.results)
                        this.setState({ userGames: userGamesState })
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
        this.setState({ userGames: newGamesArray })

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

    // function to add a game to users collection
    addGameToCollection = function (game, favorite) {
        // build up data to post to database
        const dataToPost = {
            "userId": this.state.activeUser,
            "gameId": game.id,
            "isFavorited": favorite,
            "progress": "To Be Played"
        }

        // add game id to users collection of games ids
        const oldIds = this.state.userGamesIds
        const newIds = [game.id]
        const newStateOfIds = oldIds.concat(newIds)
        this.setState({ userGamesIds: newStateOfIds })

        // get full game info from gb api and add it to usergames state
        APIManager.getGbGame(game.id)
            .then(response => {
                const oldGames = this.state.userGames
                const newGame = [response.results]
                const newGamesState = oldGames.concat(newGame)
                this.setState({ userGames: newGamesState })
            })
        // add game data to userGames state
        // post that data to database
        APIManager.post("usersGames", dataToPost)
            .then(r => r.json())
            .then(response => {
                // build up object representing full data needed for state
                const gameToAddToState = {
                    "id": response.id,
                    "gameId": response.gameId,
                    "isFavorited": response.isFavorited,
                    "progress": response.progress,
                }
                // build up array of new app state for user games
                const oldState = this.state.userGamesStats
                const newState = oldState.concat([gameToAddToState])
                this.setState({ userGamesStats: newState })
            })
    }.bind(this)

    // function to remove a game from the collection
    removeGameFromCollection = function (id) {
        // get index of game to be removed
        const indexOfGameToRemove = this.state.userGames.findIndex(game => game.id === id)
        // get user game id for deletion
        const userGameId = this.state.userGames[indexOfGameToRemove].id
        // get current state of userGames
        const newGamesState = this.state.userGames
        // remove game by index
        newGamesState.splice(indexOfGameToRemove, 1)

        // remove game from ids collection
        const indexOfId = this.state.userGamesIds.findIndex(idFromArray => idFromArray === id)
        const newIdsState = this.state.userGamesIds
        newIdsState.splice(indexOfId, 1)

        // remove the game from stats collection
        const indexOfStats = this.state.userGamesStats.findIndex(game => game.gameId === id)
        const newStatsState = this.state.userGamesStats
        newStatsState.splice(indexOfStats, 1)

        // set state from values of above splices
        debugger
        this.setState({
            userGamesStats: newStatsState,
            userGames: newGamesState,
            userGamesIds: newIdsState
        })


        APIManager.delete("usersGames", userGameId)

    }.bind(this)

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
                    return <SearchView activeUser={this.state.activeUser} userGamesIds={this.state.userGamesIds} addGameToCollection={this.addGameToCollection} removeGame={this.removeGameFromCollection} />
                case "suggest":
                    return <SuggestView userGamesIds={this.state.userGamesIds} addGameToCollection={this.addGameToCollection} removeGameFromCollection={this.removeGameFromCollection} userGames={this.state.userGames} />
                case "dummy":
                    return <Title>This is a dummy page to make sure I don't spam giant bomb's public api too much</Title>
                case "profile":
                default:
                    return <ProfileView firstName={this.state.userFirstName} lastName={this.state.userLastName} gamertag={this.state.userGamertag} activeUser={this.state.activeUser} userGamesIds={this.state.userGamesIds} userGamesStats={this.state.userGamesStats} games={this.state.userGames} changeGameProgress={this.changeGameProgress} removeGame={this.removeGameFromCollection} />
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