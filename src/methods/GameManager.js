import $ from 'jquery'
import APIManager from '../api/APIManager';

/* 
    module to manage users game collection
    authors Riley Mathews
*/

const GameManager = Object.create(null, {
    changeGameProgress: {
        value: function (event) {
            // grab the usersGame id from the id of the event
            const gameId = event.target.id.split("__")[3]
            // hide the select field
            $(`#game__change__progress__container__${gameId}`).hide()

            // set state of corresponding game
            const oldGamesArray = this.state.userGamesStats

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
            this.setState({ userGamesStats: newGamesArray })

            // remove data that was embeded in original state
            const dataToSend = {
                "id": dataToChange.id,
                "userId": dataToChange.userId,
                "gbId": dataToChange.gbId,
                "isFavorited": dataToChange.isFavorited,
                "progress": dataToChange.progress
            }

            APIManager.put("usersGames", dataToSend, gameId)
        }
    },
    addGameToCollection: {
        value: function (game, favorite) {
            // build up data to post to database
            const dataToPost = {
                "userId": this.state.activeUser,
                "gbId": game.id,
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
                        "gbId": response.gbId,
                        "isFavorited": response.isFavorited,
                        "progress": response.progress,
                    }
                    // build up array of new app state for user games
                    const oldState = this.state.userGamesStats
                    const newState = oldState.concat([gameToAddToState])
                    this.setState({ userGamesStats: newState })
                })
        }
    },
    removeGameFromCollection: {
        value: function (id) {
            // get index of game to be removed
            const indexOfGameToRemove = this.state.userGames.findIndex(game => game.id === id)
            // get user game id for deletion
            const userGameId = this.state.userGamesStats[indexOfGameToRemove].id
            // get current state of userGames
            const newGamesState = this.state.userGames
            // remove game by index
            newGamesState.splice(indexOfGameToRemove, 1)

            // remove game from ids collection
            const indexOfId = this.state.userGamesIds.findIndex(idFromArray => idFromArray === id)
            const newIdsState = this.state.userGamesIds
            newIdsState.splice(indexOfId, 1)

            // remove the game from stats collection
            const indexOfStats = this.state.userGamesStats.findIndex(game => game.gbId === id)
            const newStatsState = this.state.userGamesStats
            newStatsState.splice(indexOfStats, 1)

            // set state from values of above splices
            this.setState({
                userGamesStats: newStatsState,
                userGames: newGamesState,
                userGamesIds: newIdsState
            })


            APIManager.delete("usersGames", userGameId)

        }
    },
    toggleGameFavorite: {
        value: function (event) {
            const userGameId = event.target.id.split("__")[3]
            // cycle through games stats
            const userGamesStats = this.state.userGamesStats
            let dataToChange
            const newState = userGamesStats.map(game => {
                if (parseInt(userGameId, 10) === parseInt(game.id, 10)) {
                    game.isFavorited = game.isFavorited ? false : true;
                    dataToChange = game
                    return game
                } else {
                    return game
                }
            })
            this.setState({ userGamesStats: newState })
            APIManager.put("usersGames", dataToChange, userGameId)
        }
    }
})

export default GameManager