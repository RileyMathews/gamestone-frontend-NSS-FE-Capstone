import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Level, LevelLeft, Content, LevelItem, LevelRight, Button } from 'bloomer';


class Game extends Component {


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
                            <br />
                            {this.props.info.deck}
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
