import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Content, Level, LevelLeft, LevelRight, Button, } from 'bloomer';
import GenreList from '../genres/GenreList';


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
            return <i className="material-icons">check_circle</i>
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
                        </p>
                    </Content>

                    <Level>
                        <LevelLeft>
                            <GenreList genres={this.props.info.genres}/>
                        </LevelLeft>
                        <LevelRight>
                            {this.isGameOwnedButton()}
                            <Button disabled="true">Favorite Game</Button>
                        </LevelRight>
                    </Level>
                </MediaContent>
            </Media>
        )
    }
}

export default Result
