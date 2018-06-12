import React, { Component } from 'react'
import { Title, Container, Button } from 'bloomer'
import ArrayManager from '../functions/ArrayManager'
import APIManager from '../api/APIManager';
import Result from '../search/Result';


class SuggestView extends Component {

    state = {
        resultBasis: "",
        results: [],
        userGamesLength: this.props.userGames.length
    }

    getGameBySimilarity = function () {
        // variable to check if a valid suggested game has been found
        let gameNotFound = true
        // while a good game has still not been found, keep running checks
        while (gameNotFound) {
            // get a random game from the users collection
            const selectedUserGame = ArrayManager.getRandomItem(this.props.userGames)
            // if the game has similar games listed
            if (selectedUserGame.similar_games !== null) {

                // get a random game from that similar games array and set state of this component accordingly
                const suggestedGame = ArrayManager.getRandomItem(selectedUserGame.similar_games)
                // check to see if user already has game in collection
                if (!this.props.userGamesIds.includes(suggestedGame.id)) {
                    this.setState({result: suggestedGame})
                    console.log(suggestedGame.id)
                    this.setState({resultBasis: `This game was selected because it is similar to this game in your collection: ${selectedUserGame.name}`})
                    gameNotFound = false
                    APIManager.getGbGame(suggestedGame.id)
                        .then(response => {
                            this.setState({results: [response.results]})
                        })
                }
            }
        }
    }.bind(this)


    render() {
        return (
            <Container>
                <Title>Suggest Games</Title>
                <Button disabled="true">By Genre</Button>
                <Button onClick={this.getGameBySimilarity}>By Similar Games</Button>
                <Button disabled="true">By Developer</Button>
                <p>{this.state.resultBasis}</p>
                {this.state.results.map(result => (
                    <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGameFromCollection}/>
                ))}
            </Container>
        )
    }
}

export default SuggestView
