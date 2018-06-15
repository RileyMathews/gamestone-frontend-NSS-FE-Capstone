import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Content, Level, LevelLeft, LevelRight, Button, Icon } from 'bloomer';

/* 
    module to display the results of searching giant bombs api of games
    authors Riley Mathews
*/
class Result extends Component {

    isGameOwned = function () {
        if (this.props.userGamesIds.includes(this.props.info.id)) {
            return true
        } else {
            return false
        }
    }

    isGameOwnedCheckMark = function () {
        if (this.isGameOwned()) {
            return <Icon className="fas fa-check-circle" />
        }
    }.bind(this)

    isGameOwnedButton = function () {
        if (this.isGameOwned()) {
            return <Button onClick={this.removeGameById}>Remove Game</Button>
        } else {
            return <Button onClick={this.addGame}>Add Game</Button>
        }
    }.bind(this)

    addGame = function () {
        this.props.addGameToCollection(this.props.info, false) 
    }.bind(this)

    addGameFavorite = function () {
        this.props.addGameToCollection(this.props.info, true)
    }.bind(this)

    removeGameById = function () {
        this.props.removeGame(this.props.info.id)
    }.bind(this)


    render() {
        return (
            <Media>
                <MediaLeft>
                    <Image src={this.props.info.image.icon_url} />
                </MediaLeft>
                <MediaContent>
                    <Content>
                        <p>
                            <strong>{this.props.info.name}</strong>
                            {this.isGameOwnedCheckMark()}
                            <br />
                            {this.props.info.deck}
                            <a href={this.props.info.site_detail_url} target="_blank">  learn more</a>
                        </p>
                    </Content>

                    <Level>
                        <LevelLeft>
                        </LevelLeft>
                        <LevelRight>
                            {this.isGameOwnedButton()}
                            {this.isGameOwned() ? null : <Button onClick={this.addGameFavorite}>Add Game as Favorite</Button>}
                        </LevelRight>
                    </Level>
                </MediaContent>
            </Media>
        )
    }
}

export default Result
