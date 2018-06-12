import React, { Component } from 'react'
import Game from './Game';
    

class GamesList extends Component {

    userOwnsGame = function (game) {
        if (this.props.userGamesIds.includes(game.id)) {
            return true
        } else {
            return false
        }
    }.bind(this)


    render() {
        return (
            <div>
                {this.props.games.map(game => (
                    <Game removeGame={this.props.removeGame} gameInfo={game.game} userGamesStats={this.props.userGamesStats} game={game} key={game.id} changeGameProgress={this.props.changeGameProgress} userOwnsGame={this.userOwnsGame(game)} gbId={game.id}/>
                ))}
            </div>
        )
    }
}

export default GamesList
