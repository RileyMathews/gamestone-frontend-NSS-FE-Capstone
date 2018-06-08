import React, { Component } from 'react'
import Game from './Game';
const $ = require('jquery')


class GamesList extends Component {

    changeGameProgress = function (event) {
        console.log(event.target.id)
        const gameId = event.target.id.split("__")[3]
        console.log(gameId)
        $(`#game__change__progress__container__${gameId}`).hide()
    }


    render() {
        return (
            <div>
                {this.props.games.map(game => (
                    <Game gameInfo={game.game} info={game} key={game.id} changeGameProgress={this.props.changeGameProgress}/>
                ))}
            </div>
        )
    }
}

export default GamesList
