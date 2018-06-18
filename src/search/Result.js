import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Content, Level, LevelLeft, LevelRight, Button, Icon } from 'bloomer';
import PlatformTag from '../platforms/PlatformTag';
import { Context } from '../Provider';

/* 
    module to display the results of searching giant bombs api of games *context
    authors Riley Mathews
*/
class Result extends Component {

    isGameOwned = function (context) {
        if (context.state.userGamesIds.includes(this.props.info.id)) {
            return true
        } else {
            return false
        }
    }

    isGameOwnedCheckMark = function (context) {
        if (this.isGameOwned(context)) {
            return <Icon className="fas fa-check-circle" />
        }
    }.bind(this)

    isGameOwnedButton = function (context) {
        if (this.isGameOwned(context)) {
            return <Button isColor="primary" onClick={() => this.removeGameById(context)}>Remove Game</Button>
        } else {
            return <Button isColor="primary" onClick={() => this.addGame(context)}>Add Game</Button>
        }
    }.bind(this)

    

    addGameFavorite = function () {
        this.props.addGameToCollection(this.props.info, true)
    }.bind(this)

    removeGameById = function (context) {
        context.removeGameFromCollection(this.props.info.id)
    }.bind(this)

    addGame = function (context) {
        context.addGameToCollection(this.props.info, false)
    }.bind(this)


    render() {
        return (
            <Context.Consumer>
                {context => (
                <Media>
                    <MediaLeft>
                        <Image src={this.props.info.image.icon_url} />
                    </MediaLeft>
                    <MediaContent>
                        <Content>
                            <p>
                                <strong>{this.props.info.name}</strong>
                                {this.isGameOwnedCheckMark(context)}
                                <br />
                                {this.props.info.deck}
                                <a href={this.props.info.site_detail_url} target="_blank">  learn more</a>
                            </p>
                        </Content>

                        <Level>
                            <LevelLeft>
                                {this.props.info.platforms.map(platform => (<PlatformTag allPlatforms={this.props.allPlatforms} platform={platform} key={platform.id} />))}
                            </LevelLeft>
                            <LevelRight>
                                {this.isGameOwnedButton(context)}
                                {this.isGameOwned(context) ? null : <Button isColor="primary" onClick={this.addGameFavorite}>Add Game as Favorite</Button>}
                            </LevelRight>
                        </Level>
                    </MediaContent>
                </Media>
                )}
            </Context.Consumer>
        )
    }
}

export default Result
