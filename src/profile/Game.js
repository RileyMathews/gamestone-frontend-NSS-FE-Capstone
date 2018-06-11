import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Level, LevelLeft, Content, LevelRight, Button, Select } from 'bloomer';
import './Game.css'
import GenreList from '../genres/GenreList';
const $ = require('jquery')


class Game extends Component {

    editGame = function (event) {
        const gameId = event.target.id.split("__")[3]
        const editField = $(`#game__change__progress__container__${gameId}`)
        editField.toggle()
    }

    componentDidMount() {
        const gameId = this.props.info.id
        const editField = $(`#game__change__progress__container__${gameId}`)
        editField.hide()
    }

    gameOwned = function (owned) {
        if (owned) {
            return "owned"
        } else {
            return "not owned"
        }
    }

    removeGameById = function () {
        this.props.removeGame(this.props.info.gameId)
    }.bind(this)


    render() {
        return (
            <Media>
                <MediaLeft>
                    <Image src={this.props.gameInfo.image.icon_url} />
                </MediaLeft>
                <MediaContent>
                    <Content>
                        <p>
                            <strong>{this.props.gameInfo.name}</strong>
                            <br />
                            {this.props.gameInfo.deck}
                        </p>
                    </Content>

                    <Level>
                        <LevelLeft>
                            <GenreList genres={this.props.gameInfo.genres}/>
                        </LevelLeft>
                        <LevelRight>
                            <p>Status: {this.props.info.progress}</p>
                            <div id={"game__change__progress__container__" + this.props.info.id}>
                                <Select id={"game__change__progress__"+this.props.info.id} className="game__change__progress" isSize="small" isColor="primary" onChange={this.props.changeGameProgress} defaultValue="default">
                                    <option disabled="true" value="default">Select a Status</option>
                                    <option value="Backlog">Backlog</option>
                                    <option value="To Be Played">To Be Played</option>
                                    <option value="Playing">Playing</option>
                                    <option value="Finished">Finished</option>
                                </Select>
                            </div>
                            <i className="material-icons" id={"game__edit__progress__" + this.props.info.id} onClick={this.editGame}>edit</i>,
                            <p>Favorite: {this.props.info.isFavorited}</p>
                            <Button onClick={this.removeGameById}>Remove Game</Button>
                            
                            <Button disabled="true">Favorite Game</Button>
                        </LevelRight>
                    </Level>
                </MediaContent>
            </Media>
        )
    }
}

export default Game
