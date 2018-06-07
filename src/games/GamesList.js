import React, { Component } from 'react'
import Game from './Game';


class GamesList extends Component {


    render() {
        return (
            <div>
                {this.props.games.map(game => (
                    <Game info={game} key={game.id}/>
                ))}
            </div>
        )
    }
}

export default GamesList
