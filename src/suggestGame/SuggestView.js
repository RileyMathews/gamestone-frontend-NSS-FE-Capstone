import React, { Component } from 'react'
import { Title, Container, Button, Checkbox } from 'bloomer'
import Result from '../search/Result';
import SuggestionManager from '../methods/SuggestionManager'


class SuggestView extends Component {

    state = {
        resultBasis: "",
        results: [],
        userGamesLength: this.props.userGames.length,
        filterByFavorites: false,
        filterByConsoles: false,
        userHasFavorites: false,
        userHasPlatforms: false
    }

    /* 
        import functions
    */
    getCurrentFilters = SuggestionManager.getCurrentFilters.bind(this)
    suggestGameBySimilarity = SuggestionManager.suggestGameBySimilarity.bind(this)
    suggestGameByDeveloper = SuggestionManager.suggestGameByDeveloper.bind(this)


    setFilters = function (event) {
        const favoriteValue = document.querySelector("#favoriteFilter").checked
        const consoleValue = document.querySelector("#consoleFilter").checked
        this.setState({ 
            filterByFavorites: favoriteValue,
            filterByConsoles: consoleValue
        })
    }.bind(this)

    getGameBySimilarity = function () {
        const filters = this.getCurrentFilters()
        this.suggestGameBySimilarity(filters)
    }.bind(this)

    getGameByDeveloper = function () {
        const filters = this.getCurrentFilters()
        this.suggestGameByDeveloper(filters)
    }.bind(this)


    componentDidMount() {
        const foundFavoriteGame = this.props.userGamesStats.find(game => game.isFavorited === true)
        if (foundFavoriteGame !== undefined) {
            this.setState({ userHasFavorites: true })
        }
        if (this.props.userPlatformsIds.length > 0) {
            this.setState({ userHasPlatforms: true})
        }
    }

    doesUserHaveGames = function () {
        if (this.state.filterByFavorites === true && this.state.userHasFavorites === false) {
            return <Title>You have no favorite games to filter by</Title>
        } else {
            if (this.state.userGamesLength === 0) {
                return <Title>You have no games</Title>
            } else {
                if (this.state.filterByConsoles === true && this.state.userHasPlatforms === false) {
                    return <Title>You have no consoles to filter by</Title>
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
        }

    }.bind(this)


    render() {
        return (
            <div>
                <Checkbox onChange={this.setFilters} id="favoriteFilter"> Filter By Favorites </Checkbox>
                <Checkbox onChange={this.setFilters} id="consoleFilter"> Filter By Platforms <small>note, depending on the games and platforms you own, checking this filter may make finding games more difficult</small></Checkbox>
                {this.doesUserHaveGames()}
            </div>
        )
    }
}

export default SuggestView


