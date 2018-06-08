import React, { Component } from 'react'
import { Title, Container } from 'bloomer'
import GamesList from '../games/GamesList';
import APIManager from '../api/APIManager'
const $ = require('jquery')


class ProfileView extends Component {

    state = {
        games: []
    }

    changeGameProgress = function (event) {
        // grab the usersGame id from the id of the event
        const gameId = event.target.id.split("__")[3]
        // hide the select field
        $(`#game__change__progress__container__${gameId}`).hide()

        // set state of corresponding game
        const oldGamesArray = this.state.games

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
        this.setState({games: newGamesArray})

        // remove data that was embeded in original state
        const dataToSend = {
            "id": dataToChange.id,
            "userId": dataToChange.userId,
            "gameId": dataToChange.gameId,
            "isFavorited": dataToChange.isFavorited,
            "progress": dataToChange.progress
        }

        APIManager.put("usersGames", dataToSend, gameId)
            

    }.bind(this)

    componentDidMount() {
        fetch(`http://localhost:8088/usersGames?userId=${this.props.activeUser}&_expand=game`)
        .then (r => r.json())
        .then(response => {
            this.setState({games: response})
        })
    }

    render() {
        return (
            <Container>
                <Title isSize={3}>{this.props.firstName} {this.props.lastName} AKA {this.propsgamertag}</Title>
                <Title isSize={4}>Games</Title>
                <GamesList games={this.state.games} changeGameProgress={this.changeGameProgress}/>
            </Container>
        )
    }
}

export default ProfileView
