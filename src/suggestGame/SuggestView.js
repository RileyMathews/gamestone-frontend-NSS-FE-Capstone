import React, { Component } from 'react'
import { Title, Container, Button, Checkbox } from 'bloomer'
import ArrayManager from '../methods/ArrayManager'
import APIManager from '../api/APIManager';
import Result from '../search/Result';


class SuggestView extends Component {

    state = {
        resultBasis: "",
        results: [],
        userGamesLength: this.props.userGames.length,
        filterByFavorites: false,
        filterByConsoles: false,
        userHasFavorites: false
    }

    setFavoriteFilter = function (event) {
        const value = document.querySelector("#favoriteFilter").checked
        this.setState({ filterByFavorites: value })
    }.bind(this)

    getGameBySimilarity = function () {
        // variable to check if a valid suggested game has been found
        let gameNotFound = true
        // while a good game has still not been found, keep running checks
        while (gameNotFound) {
            // get a random game from the users collection
            const selectedUserGameStats = ArrayManager.getRandomItem(this.props.userGamesStats)
            // get the related game information
            const selectedUserGame = this.props.userGames.find(game => game.id === selectedUserGameStats.gbId)
            // if the game has similar games listed
            if (selectedUserGame.similar_games !== null && (this.state.filterByFavorites === false || selectedUserGameStats.isFavorited === true)) {

                // get a random game from that similar games array and set state of this component accordingly
                const suggestedGame = ArrayManager.getRandomItem(selectedUserGame.similar_games)
                // check to see if user already has game in collection
                if (!this.props.userGamesIds.includes(suggestedGame.id)) {
                    this.setState({ result: suggestedGame })
                    this.setState({ resultBasis: `This game was selected because it is similar to this game in your collection: ${selectedUserGame.name}` })
                    gameNotFound = false
                    APIManager.getGbGame(suggestedGame.id)
                        .then(response => {
                            this.setState({ results: [response.results] })
                        })
                }
            }
        }
    }.bind(this)

    getGameByDeveloper = function () {
        // variable to check a valid game has been selected to suggest by
        let developerNotFound = true
        // keep running check until game is found
        while (developerNotFound) {
            // get a random game
            const selectedUserGamesStats = ArrayManager.getRandomItem(this.props.userGamesStats)
            // get the game info for that game
            const selectedUserGame = this.props.userGames.find(game => game.id === selectedUserGamesStats.gbId)
            // check to see if game will work for search terms
            if (selectedUserGame.developers !== null && (this.state.filterByFavorites === false || selectedUserGamesStats.isFavorited === true)) {
                // get a random developer from the game info
                const developer = ArrayManager.getRandomItem(selectedUserGame.developers)
                developerNotFound = false
                // set the result basis
                this.setState({ resultBasis: `This game was selected becuase it was developed by ${developer.name}, who also worked on ${selectedUserGame.name}` })
                // get that companys info
                APIManager.getGbCompany(developer.id)
                    .then(response => {
                        // get a random game they worked on
                        const developerGame = ArrayManager.getRandomUnownedGame(response.results.developed_games, this.props.userGamesIds)
                        if (developerGame !== false) {
                            APIManager.getGbGame(developerGame.id)
                                .then(response => {
                                    this.setState({ results: [response.results] })
                                })
                        } else {
                            this.setState({ resultBasis: `We were going to show you a game by ${developer.name}, but it seems you already have every game they have worked on.`})
                        }
                    })
            }
        }
    }.bind(this)

    componentDidMount() {
        const foundFavoriteGame = this.props.userGamesStats.find(game => game.isFavorited === true)
        if (foundFavoriteGame !== undefined) {
            this.setState({ userHasFavorites: true })
        }
    }

    doesUserHaveGames = function () {
        if (this.state.filterByFavorites === true && this.state.userHasFavorites === false) {
            return <Title>You have no favorite games to filter by</Title>
        } else {
            if (this.state.userGamesLength === 0) {
                return <Title>You have no games</Title>
            } else {
                return <Container>
                    <Title>Suggest Games</Title>
                    <Button onClick={this.getGameBySimilarity}>By Similar Games</Button>
                    <Button onClick={this.getGameByDeveloper}>By Developer</Button>
                    <p>{this.state.resultBasis}</p>
                    {this.state.results.map(result => (
                        <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGameFromCollection} />
                    ))}
                </Container>
            }
        }

    }.bind(this)


    render() {
        return (
            <div>
                <Checkbox onChange={this.setFavoriteFilter} id="favoriteFilter"> Filter By Favorites </Checkbox>
                {this.doesUserHaveGames()}
            </div>
        )
    }
}

export default SuggestView


