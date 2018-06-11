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
        let gameNotFound = true
        while (gameNotFound) {
            const selectedUserGame = ArrayManager.getRandomItem(this.props.userGames)
            if (selectedUserGame.game.similar_games.length > 0) {
                const suggestedGame = ArrayManager.getRandomItem(selectedUserGame.game.similar_games)
                this.setState({result: suggestedGame})
                this.setState({resultBasis: `This game was selected because it is similar to this game in your collection: ${selectedUserGame.game.name}`})
                gameNotFound = false
                APIManager.getSingleGame(suggestedGame.id)
                    .then(r => r.json())
                    .then(response => {
                        this.setState({results: response})
                    })
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
