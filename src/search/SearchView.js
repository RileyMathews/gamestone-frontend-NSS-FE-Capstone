import React, { Component } from 'react'
import { Container, Input, Button } from 'bloomer';
import Game from '../games/Game';
import $ from 'jquery'
import APIManager from '../api/APIManager';


class SearchView extends Component {
    state = {
        searchString: "",
        results: []
    }


    handleSearchInputChanage = function () {
        const inputField = $("#search__input")
        this.setState({ searchString: inputField.val() })
    }.bind(this)

    handleSearchSubmit = function () {
        APIManager.searchGames(this.state.searchString)
            .then(r => r.json())
            .then(response => {
                this.setState({ results: response })
            })
        this.setState({ searchString: "" })
    }.bind(this)

    render() {
        return (
            <Container>
                <Input id="search__input" onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                <Button id="search__submit" isColor="primary" onClick={this.handleSearchSubmit}>Search</Button>
                { this.state.results.map(game => <Game info={game} key={game.id} />) }
            </Container >
        )
    }
}

export default SearchView
