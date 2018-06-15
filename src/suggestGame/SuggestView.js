import React, { Component } from 'react'
import { Title, Container, Button, Checkbox, Columns, Column, Field, Box } from 'bloomer'
import Result from '../search/Result';
import SuggestionManager from '../methods/SuggestionManager'

/* 
    module to handle displaying and calling logic for suggesting games to the user
    authors Riley Mathews
*/
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
            this.setState({ userHasPlatforms: true })
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
                    return <div>
                        <Title>Suggest Games</Title>
                        <Button onClick={this.getGameBySimilarity}>By Similar Games</Button>
                        <Button onClick={this.getGameByDeveloper}>By Developer</Button>
                        <p>{this.state.resultBasis}</p>
                        {this.state.results.map(result => (
                            <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGameFromCollection} />
                        ))}
                    </div>
                }
            }
        }

    }.bind(this)


    render() {
        return (
            <Container>
                <Columns>
                    <Column isSize={3}>
                        <Box>
                            <Title tag="h4" isSize={3}>Filters</Title>
                            <Field>
                                <Checkbox onChange={this.setFilters} id="favoriteFilter">  Favorites </Checkbox>
                            </Field>
                            <Field>
                                <Checkbox onChange={this.setFilters} id="consoleFilter">  Platforms </Checkbox>
                            </Field>
                            <small>note, depending on the games and platforms you own, checking too many filters may make finding games more difficult. If no game is found, try again after a second. The search is sometimes stopped before finding a game that meets all criteria to lessen the load on the database.</small>
                        </Box>
                    </Column>
                    <Column>
                        {this.doesUserHaveGames()}
                    </Column>
                </Columns>
            </Container>
        )
    }
}

export default SuggestView


