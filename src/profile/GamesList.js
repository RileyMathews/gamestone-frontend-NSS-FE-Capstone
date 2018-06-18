import React, { Component } from 'react'
import Game from './Game';
import { Context } from '../Provider';

/* 
    module to display information about a list of games passed to it
    authors Riley Mathews
*/

class GamesList extends Component {

    userOwnsGame = function (game, context) {
        if (context.state.userGamesIds.includes(game.id)) {
            return true
        } else {
            return false
        }
    }


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        {context.state.userGames.map(game => (
                            <Game
                                removeGameFromCollection={context.removeGameFromCollection}
                                gameInfo={game.game}
                                userGamesStats={context.state.userGamesStats}
                                game={game}
                                key={game.id}
                                changeGameProgress={context.changeGameProgress}
                                userOwnsGame={this.userOwnsGame(game, context)}
                                gbId={game.id}
                                toggleGameFavorite={context.toggleGameFavorite}
                            />
                        ))}
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default GamesList
