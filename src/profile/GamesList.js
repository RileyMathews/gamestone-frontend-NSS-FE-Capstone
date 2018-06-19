import React, { Component } from 'react'
import Game from './Game';
import { Context } from '../Provider';
import GamesFilters from './GamesFilters';
import { Columns, Column } from 'bloomer';

/* 
    module to display information about a list of games passed to it
    authors Riley Mathews
*/

class GamesList extends Component {

    state = {
        filters: []
    }

    updateFilter = function (event) {
        const filter = event.target.value
        let newFilters = this.state.filters
        if (event.target.checked) {
            newFilters.push(filter)
            this.setState({ filters: newFilters })
        } else {
            const index = newFilters.find(item => item === filter)
            newFilters.splice(index, 1)
            this.setState({ filters: newFilters })
        }
    }.bind(this)

    clearFilters = function () {
        this.setState({ filters: [] })
        document.querySelector("#filter__backlog").checked = false
        document.querySelector("#filter__toBePlayed").checked = false
        document.querySelector("#filter__playing").checked = false
        document.querySelector("#filter__finished").checked = false
    }.bind(this)

    userOwnsGame = function (game, context) {
        if (context.state.userGamesIds.includes(game.id)) {
            return true
        } else {
            return false
        }
    }

    filteredGames = function (context) {
        if (this.state.filters.length !== 0) {
            const userGamesStats = context.state.userGamesStats
            const userGames = context.state.userGames
            const filteredGamesStatsIds = userGamesStats.filter(game => this.state.filters.includes(game.progress)).map(game => game.gbId)
            const filteredGames = userGames.filter(game => filteredGamesStatsIds.includes(game.id))
            return filteredGames.sort(this.compare)
        } else {
            return context.state.userGames.sort(this.compare)
        }
    }.bind(this)

    compare = function (a, b) {
        // Use toUpperCase() to ignore character casing
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <Columns>
                        <Column isSize={2}>
                            <GamesFilters updateFilter={this.updateFilter} clearFilters={this.clearFilters} />
                        </Column>
                        <Column>
                            {this.filteredGames(context).map(game => (
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
                        </Column>
                    </Columns>
                )}
            </Context.Consumer>
        )
    }
}

export default GamesList



