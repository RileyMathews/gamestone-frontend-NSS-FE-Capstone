import React, { Component } from 'react'
import { Container, Input, Button } from 'bloomer';
import $ from 'jquery'
import APIManager from '../api/APIManager';
import Result from './Result';


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
        APIManager.searchGbGames(this.state.searchString)
            .then(response => {
                this.setState({ results: response.results })
            })
        this.setState({ searchString: "" })
    }.bind(this)

    render() {
        return (
            <Container>
                <Input id="search__input" onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                <Button id="search__submit" isColor="primary" onClick={this.handleSearchSubmit}>Search</Button>
                {this.state.results.map(result => (
                    <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGame}/>
                ))}
            </Container >
        )
    }
}

export default SearchView
