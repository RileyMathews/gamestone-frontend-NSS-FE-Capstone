import React, { Component } from 'react'
import { Container, Input, Button, Pagination, PageControl, PageList, Page, PageLink, PageEllipsis, Image } from 'bloomer';
import $ from 'jquery'
import APIManager from '../api/APIManager';
import Result from './Result';

/* 
    module to display the search page for games
    authors Riley Mathews
*/

class SearchView extends Component {
    state = {
        searchString: "",
        currentSearch: "",
        results: [],
        waitingMessage: "",
        currentPage: 1,
        totalPages: null,
        waiting: false
    }

    searchForGame = function () {
        APIManager.searchGbGames(this.state.searchString, 1)
            .then(response => {
                this.setState({
                    totalPages: Math.ceil(response.number_of_total_results / 10),
                    results: response.results,
                    waitingMessage: "",
                    waiting: false
                })
            })
    }.bind(this)

    changeSearchPage = function (page) {
        APIManager.searchGbGames(this.state.currentSearch, page)
            .then(response => {
                this.setState({
                    results: response.results,
                    waiting: false
                })
            })
    }.bind(this)


    handleSearchInputChanage = function () {
        const inputField = $("#search__input")
        this.setState({ searchString: inputField.val() })
    }.bind(this)

    handleSearchSubmit = function (evt) {
        evt.preventDefault()
        this.searchForGame()
        this.setState({
            currentSearch: this.state.searchString,
            waitingMessage: "Waiting...",
            waiting: true,
            searchString: "",
            results: []
        })
    }.bind(this)

    setPage = function (event) {
        this.setState({ currentPage: parseInt(event.target.textContent, 10) })
        this.changeSearchPage(event.target.textContent)
    }.bind(this)

    incrementPage = function () {
        this.setState({ currentPage: this.state.currentPage + 1 })
        this.changeSearchPage(this.state.currentPage + 1)
    }.bind(this)

    decrementPage = function () {
        this.setState({ currentPage: this.state.currentPage - 1 })
        this.changeSearchPage(this.state.currentPage - 1)
    }.bind(this)

    pageLinkDisplay = function (page) {
        if (page === this.state.currentPage) {
            return <Page><PageLink isCurrent>{page}</PageLink></Page>
        } else {
            return <Page><PageLink onClick={this.setPage}>{page}</PageLink></Page>
        }
    }.bind(this)

    pageDisplay = function () {
        if (this.state.currentPage <= 3 && this.state.totalPages > 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    {this.pageLinkDisplay(2)}
                    {this.pageLinkDisplay(3)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.totalPages)}
                </PageList>
            )
        } else if (this.state.currentPage > 3 && this.state.currentPage <= this.state.totalPages - 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.currentPage - 1)}
                    {this.pageLinkDisplay(this.state.currentPage)}
                    {this.pageLinkDisplay(this.state.currentPage + 1)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.totalPages)}
                </PageList>
            )
        } else if (this.state.currentPage >= this.state.totalPages - 3 && this.state.totalPages > 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    <Page><PageEllipsis /></Page>
                    {this.pageLinkDisplay(this.state.totalPages - 2)}
                    {this.pageLinkDisplay(this.state.totalPages - 1)}
                    {this.pageLinkDisplay(this.state.totalPages)}
                </PageList>
            )
        } else if (this.state.totalPages === 3) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    {this.pageLinkDisplay(2)}
                    {this.pageLinkDisplay(3)}
                </PageList>
            )
        } else if (this.state.totalPages === 2) {
            return (
                <PageList>
                    {this.pageLinkDisplay(1)}
                    {this.pageLinkDisplay(2)}
                </PageList>
            )
        }
    }.bind(this)

    paginationDisplay = function () {
        if (this.state.results.length === 0 || this.state.totalPages <= 1) {
            return null
        } else {
            return (
                <Pagination>
                    <PageControl onClick={this.decrementPage}>Previous</PageControl>
                    <PageControl onClick={this.incrementPage} isNext>Next</PageControl>
                    {this.pageDisplay()}
                </Pagination>
            )
        }
    }.bind(this)

    render() {
        return (
            <Container>
                <form onSubmit={this.handleSearchSubmit}>
                    <Input id="search__input" onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                    <Button id="search__submit" isColor="primary" type="submit">Search</Button>
                    {this.state.waiting ? <Image src="./Pacman-1s-200px.svg" isSize="128x128"/> : null}
                    {this.state.results.map(result => (
                        <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGame} />
                    ))}
                    {this.paginationDisplay()}
                </form>
            </Container >
        )
    }
}

export default SearchView
