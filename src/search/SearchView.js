import React, { Component } from 'react'
import { Container, Input, Button, Title } from 'bloomer';
import $ from 'jquery'
import APIManager from '../api/APIManager';
import Result from './Result';


class SearchView extends Component {
    state = {
        searchString: "",
        results: [],
        waitingMessage: ""
    }


    handleSearchInputChanage = function () {
        const inputField = $("#search__input")
        this.setState({ searchString: inputField.val() })
    }.bind(this)

    handleSearchSubmit = function (evt) {
        evt.preventDefault()
        this.setState({waitingMessage: "Waiting..."})
        APIManager.searchGbGames(this.state.searchString)
            .then(response => {
                this.setState({ 
                    results: response.results,
                    waitingMessage: ""
                })
            })
        this.setState({ searchString: "" })
    }.bind(this)

    render() {
        return (
            <Container>
                <form onSubmit={this.handleSearchSubmit}>
                    <Input id="search__input" onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                    <Button id="search__submit" isColor="primary" type="submit">Search</Button>
                    <Title>{this.state.waitingMessage}</Title>
                    {this.state.results.map(result => (
                        <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGame} />
                    ))}
                </form>
            </Container >
        )
    }
}

export default SearchView
