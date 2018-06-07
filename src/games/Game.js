import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Level, LevelLeft, Content, LevelItem, LevelRight, Button } from 'bloomer';


class Game extends Component {


    render() {
        return (
            <Media>
                <MediaLeft>
                    <Image src={this.props.info.game.image.icon_url} />
                </MediaLeft>
                <MediaContent>
                    <Content>
                        <p>
                            <strong>{this.props.info.game.name}</strong>
                            <br />
                            {this.props.info.game.deck}
                        </p>
                    </Content>
                    
                    <Level>
                        <LevelLeft>
                            <LevelItem>test genre</LevelItem>
                            <LevelItem>test genre</LevelItem>
                            <LevelItem>test genre</LevelItem>
                            <LevelItem>test genre</LevelItem>
                        </LevelLeft>
                        <LevelRight>
                            <p><strong>Status: {this.props.info.progress}, Favorite: {this.props.info.isFavorited}</strong></p>
                            <Button disabled="true">Add Game</Button>
                            <Button disabled="true">Favorite Game</Button>
                        </LevelRight>
                    </Level>
                </MediaContent>
            </Media>
        )
    }
}

export default Game
