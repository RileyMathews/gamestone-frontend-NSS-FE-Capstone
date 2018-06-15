import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Level, LevelLeft, Content, Select, Icon, MediaRight, Delete } from 'bloomer';
import './Game.css'
import GenreList from '../genres/GenreList';

/* 
    module to display information about a game passed to it
    authors Riley Mathews
*/

class Game extends Component {

    state = {
        userGameId: "",
        progress: "",
        isFavorited: false,
        isEditing: false
    }


    editGame = function (event) {
        this.setState({ isEditing: this.state.isEditing ? false : true })
    }.bind(this)


    getGameProgress = function () {
        const thisGamesStats = this.props.userGamesStats.find(game => game.gbId === this.props.game.id)
        if (thisGamesStats !== undefined) {
            return <p>Status: {thisGamesStats.progress}</p>
        }
    }.bind(this)

    getGameUserId = function () {
        const thisGamesStats = this.props.userGamesStats.find(game => game.gbId === this.props.game.id)
        if (thisGamesStats !== undefined) {
            return thisGamesStats.id
        }
    }.bind(this)

    getGameFavorited = function () {
        const thisGamesStats = this.props.userGamesStats.find(game => game.gbId === this.props.game.id)
        if (thisGamesStats !== undefined) {
            return thisGamesStats.isFavorited
        }
    }



    gameOwned = function (owned) {
        if (owned) {
            return "owned"
        } else {
            return "not owned"
        }
    }

    removeGameById = function () {
        this.props.removeGame(this.props.game.id)
    }.bind(this)


    render() {
        return (
            <Media>
                <MediaLeft>
                    <Image src={this.props.game.image.icon_url} />
                </MediaLeft>
                <MediaContent>
                    <Content>
                        <p className="inline">
                            <strong>{this.props.game.name}</strong>
                            {this.getGameFavorited() ? <Icon className="fas fa-star clickable" id={"game__toggle__favorite__" + this.getGameUserId()} onClick={this.props.toggleGameFavorite} /> : <Icon className="far fa-star clickable" id={"game__toggle__favorite__" + this.getGameUserId()} onClick={this.props.toggleGameFavorite} />}
                            <Icon className="fas fa-edit clickable" id={"game__edit__progress__" + this.getGameUserId()} onClick={this.editGame} />
                        </p>
                        {this.state.isEditing ? 
                        <Select id={"game__change__progress__" + this.getGameUserId()} className="inline" isSize="small" isColor="primary" onChange={this.props.changeGameProgress} defaultValue="default">
                            <option disabled="true" value="default">Select a Status</option>
                            <option value="Backlog">Backlog</option>
                            <option value="To Be Played">To Be Played</option>
                            <option value="Playing">Playing</option>
                            <option value="Finished">Finished</option>
                        </Select>
                        :
                        <span className="inline">{this.getGameProgress()}</span>
                        }
                        <p>
                            {this.props.game.deck}
                        </p>
                    </Content>

                    <Level>
                        <LevelLeft>
                            <GenreList genres={this.props.game.genres} />
                        </LevelLeft>
                    </Level>
                </MediaContent >
                <MediaRight>
                    <Delete onClick={this.removeGameById} />
                </MediaRight>
            </Media >
        )
    }
}

export default Game
